const { Schema } = require('mongoose');

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    contract: [
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
    paymentStatus: {
      type: String,
      required: [true, 'A order must have a payment status'],
      enum: ['pending', 'paid'],
    },
    paymentMode: {
      type: String,
      required: [true, 'A order must have a payment mode'],
      enum: ['cash', 'card'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = orderSchema;
