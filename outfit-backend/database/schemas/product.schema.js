const { Schema } = require('mongoose');

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A product must have a title'],
      unique: true,
      validate: {
        validator: function (val) {
          return val.length >= 3;
        },
        message: 'Title must be at least 3 characters long',
      },
    },
    description: {
      type: String,
      required: [true, 'A product must have a description'],
      validate: {
        validator: function (val) {
          return val.length >= 10;
        },
      },
      message: 'Description must be at least 10 characters long',
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [0, 'Price must be greater than 0'],
    },
    images: [
      {
        type: String,
      },
    ],
    thumbnail: {
      type: String,
      required: [true, 'A product must have a thumbnail'],
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = productSchema;
