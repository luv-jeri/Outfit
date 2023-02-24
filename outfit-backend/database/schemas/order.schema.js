const { Schema } = require('mongoose');

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    total: {
      type: Number,
      required: [true, 'A order must have a total'],
    },
    status: {
      type: String,
      required: [true, 'A order must have a status'],
      enum: ['pending', 'shipped', 'delivered'],
    },
    address: {
      type: String,
      required: [true, 'A order must have a address'],
    },
    dateOfOrder: {
      type: Date,
      default: Date.now(),
    },
    deliveryDate: {
      type: Date,
    },
    shippedDate: {
      type: Date,
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
