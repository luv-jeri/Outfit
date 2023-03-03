const Razorpay = require('razorpay');
const Order = require('../database/models/order.model');
const Contract = require('../database/models/contract.model');

var crypto = require('crypto');

const razor_pay = new Razorpay({
  key_id: 'rzp_test_pc7mVHAa7eSphk',
  key_secret: 'Ym97sPjMAv8USQB5UFmHooSb',
});

module.exports.create_razor_pay_order = async (req, res, next) => {
  const { orders, cart } = razor_pay;

  orders.create(
    {
      amount: 500 * 100,
      currency: 'INR',
      receipt: 'receipt#1',
      notes: {
        payment_type: 'for clothes',
        frontend: 'react-outfit',
      },
      cart,
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
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart } = req.body;

  const contracts = [];

  cart.forEach(async (item) => {
    const contract = await Contract.create({
      user: req.user._id,
      merchant: item.merchant,
      status: 'pending',
      product: item.product,
      quantity: item.quantity,
    });

    contracts.push(contract._id);
  });

  const newOrder = new Order({
    user: req.user._id,
    contract: contracts,
    total: 500,
    address: 'test address',
    dateOfOrder: Date.now(),
    paymentStatus: 'paid',
    paymentMode: 'card',
  });

  const order = await newOrder.save();

  res.json({
    order,
  });
};
