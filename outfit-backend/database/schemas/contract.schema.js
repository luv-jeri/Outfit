const { Schema } = require('mongoose');

const contractSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    merchant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      required: [true, 'A contract must have a status'],
      enum: ['pending', 'dispached', 'delivered', 'cancelled'],
      default: 'pending',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: [true, 'A contract must have a quantity'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = contractSchema;
