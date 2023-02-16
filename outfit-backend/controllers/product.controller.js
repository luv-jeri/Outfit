const Product = require('../database/models/product.model');

const get_all_products = async (req, res, next) => {
  try {
    // const { id } = req.query;

    // if (id) {
    //   const product = await Product.findById(id);
    //   return res.json(product);
    // }

    let { select } = req.query;

    select = select ? select.split(',').join(' ') : '';

    let products = await Product.find().select(select);

    res.json({
      state: 'success',
      data: products,
      message: `Length of products: ${products.length}`,
    });
  } catch (err) {
    next(err);
  }
};

const get_product = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json({
      state: 'success',
      data: product,
      message: `Product with id: ${id}`,
    });
  } catch (e) {
    next(e);
  }
};

const add_product = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.json({
      message: 'Product added',
      state: 'success',
      data: product,
    });
  } catch (e) {
    next(e);
  }
};

const update_product = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updated_product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      message: `Product with id: ${id} updated`,
      state: 'success',
      data: updated_product,
    });
  } catch (e) {
    next(e);
  }
};

const delete_product = async (req, res, next) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);

  res.json({
    message: `Product with id: ${id} deleted`,
    state: 'success',
  });
};

module.exports = {
  get_all_products,
  add_product,
  update_product,
  delete_product,
  get_product,
};
