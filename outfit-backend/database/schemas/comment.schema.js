const { Schema } = require('mongoose');
const validator = require('validator');
const productSchema = require('./product.schema');
const userSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    postID: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    comment: {
      type: String,
      required: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
