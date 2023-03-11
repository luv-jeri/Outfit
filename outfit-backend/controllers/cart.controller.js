const Product = require('../database/models/product.model');
const User = require('../database/models/user.model');

const add_to_cart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);

    const { cart } = user;

    // check if product is already in cart
    const productIndex = cart.findIndex((product) => {
      return product.id.toString() === id;
    });

    if (productIndex === -1) {
      user.cart.push({ id, quantity: 1 });
    } else {
      console.log('product is not in cart');
      user.cart[productIndex].quantity += 1;
    }

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Product added to cart',
      data: user.cart,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const get_cart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'cart.id',
    });

    console.log(user.cart);

    res.status(200).json({
      status: 'success',
      data: user.cart,
    });
  } catch (e) {
    next(e);
  }
};

const remove_from_cart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);

    const { cart } = user;

    // check if product is already in cart
    const productIndex = cart.findIndex((product) => product.product_id === id);

    if (productIndex !== -1) {
      // if product is in cart, decrease quantity
      user.cart[productIndex].quantity -= 1;

      // if quantity is 0, remove product from cart
      console.log(typeof user.cart[productIndex].quantity);

      if (user.cart[productIndex].quantity === 0) {
        user.cart = user.cart.filter((product) => product.product !== id);
      }
    }

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Product removed from cart',
      data: user.cart,
    });
  } catch (e) {
    next(e);
  }
};

const clear_cart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    user.cart = [];

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  add_to_cart,
  get_cart,
  remove_from_cart,
  clear_cart,
};
