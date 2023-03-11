const { Schema } = require('mongoose');
const validator = require('validator');
const productSchema = require('./product.schema');
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      lowercase: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Email must be valid',
      },
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    photo: {
      type: String,
      default:
        'https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png',
    },
    role: {
      type: String,
      required: [true, 'A user must have a role'],
      default: 'user',
      enum: ['merchant', 'user'],
    },
    details: {
      type: Schema.Types.Mixed,
    },
    cart: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    OTP: {
      type: Number,
    },
    OTPExpires: {
      type: Date,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    requests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    requestsSent: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
