const { Schema } = require('mongoose');

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    razorpayOrderId: {
      type: String,
    },
    contracts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Contract',
      },
    ],
    total: {
      type: Number,
      required: [true, 'A order must have a total'],
    },
    address: {
      type: String,
      required: [true, 'A order must have a address'],
    },
    dateOfOrder: {
      type: Date,
      default: Date.now(),
    },
    paymentMode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = orderSchema;
