const { Schema } = require('mongoose');

const contractSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
    },
    total: {
      type: Number,
    },
    priceSingle: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'delivered', 'dispatched'],
    },
    merchant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = contractSchema;
