const Razorpay = require('razorpay');
const Order = require('../database/models/order.model');
const Contract = require('../database/models/contract.model');
const User = require('../database/models/user.model');

var crypto = require('crypto');

const razor_pay = new Razorpay({
  key_id: 'rzp_test_pc7mVHAa7eSphk',
  key_secret: 'Ym97sPjMAv8USQB5UFmHooSb',
});

module.exports.create_razor_pay_order = async (req, res, next) => {
  const { orders } = razor_pay;

  const user = await User.findById(req.user._id).populate('cart.id');

  const totalPrice = user.cart.reduce((acc, item) => {
    return acc + item.id.price * item.quantity;
  }, 0);

  orders.create(
    {
      amount: totalPrice * 100,
      currency: 'INR',
      receipt: 'receipt#1',
      notes: {
        payment_type: 'for clothes',
        frontend: 'react-outfit',
      },
    },
    (err, order) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      console.log(order);
      res.json({
        order: order,
      });
    }
  );
};

module.exports.verify_razor_pay_payment = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const user = await User.findById(req.user._id).populate('cart.id');

  const totalPrice = user.cart.reduce((acc, item) => {
    return acc + item.id.price * item.quantity;
  }, 0);

  const generated_signature = crypto
    .createHmac('sha256', 'Ym97sPjMAv8USQB5UFmHooSb')
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature !== razorpay_signature) {
    return res.json({
      error: 'Invalid signature',
    });
  }

  // get payment details
  const payment = await razor_pay.payments.fetch(razorpay_payment_id);

  const order = await Order.create({
    user: req.user._id,
    total: totalPrice,
    razorpayOrderId: razorpay_order_id,
    address: 'test address',
    dateOfOrder: Date.now(),
    paymentMode: payment.method,
  });

  for (let i = 0; i < user.cart.length; i++) {
    const contract = await Contract.create({
      order: order._id,
      product: user.cart[i].id._id,
      quantity: user.cart[i].quantity,
      total: user.cart[i].id.price * user.cart[i].quantity,
      priceSingle: user.cart[i].id.price,
      status: 'pending',
      merchant: user.cart[i].id.merchant,
    });

    order.contracts.push(contract._id);
  }

  await order.save();

  user.cart = [];

  await user.save();

  res.json({
    order,
    message: 'Payment successful',
  });
};
