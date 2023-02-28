const Razorpay = require('razorpay');
const Order = require('../database/models/order.model');
var crypto = require('crypto');

const razor_pay = new Razorpay({
  key_id: 'rzp_test_pc7mVHAa7eSphk',
  key_secret: 'Ym97sPjMAv8USQB5UFmHooSb',
});

module.exports.create_razor_pay_order = async (req, res, next) => {
  const { orders } = razor_pay;

  // calculate total amount

  orders.create(
    {
      amount: 500 * 100,
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
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const toHash = razorpay_order_id + '|' + razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac('sha256', 'Ym97sPjMAv8USQB5UFmHooSb')
    .update(toHash.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    console.log('payment successful');

    // const newOrder = await Order.create({
    //   razorpay_payment_id,
    //   razorpay_order_id,
    //   razorpay_signature,
    // });

    res.json({
      message: 'Payment successful',
    });
  } else {
    console.log('payment failed');
    res.json({
      message: 'Payment failed',
    });
  }
};
