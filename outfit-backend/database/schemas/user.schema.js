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
    //   type: String,
    //   required: [true, 'A user must have a password'],
    //   minlength: [8, 'Password must be at least 8 characters long'],
    //   // validate: {
    //   //   validator: function (value) {
    //   //     return value === this.password;
    //   //   },
    //   //   message: 'Passwords do not match',
    //   // },
    // },
    photo: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: 'Photo must be a valid URL',
      },
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
        product_id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
