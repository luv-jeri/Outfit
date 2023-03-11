const Product = require('../database/models/product.model');
const axios = require('axios');
const https = require('https');
const followRedirects = require('follow-redirects');
const util = require('util');

const getRedirectedUrl = (url, options) => {
  return new Promise((resolve, reject) => {
    const req = followRedirects.https.get(url, options, (res) => {
      resolve(res.responseUrl);
    });
    req.on('error', (error) => {
      reject(error);
    });
  });
};

const get_all_products = async (req, res, next) => {
  try {
    // const { id } = req.query;

    // if (id) {
    //   const product = await Product.findById(id);
    //   return res.json(product);
    // }

    let { select, limit, page } = req.query;

    console.log(req.query);

    select = select ? select.split(',').join(' ') : '';
    const skip = (page - 1) * limit;

    let products = await Product.find({
      merchant: {
        $exists: true,
      },
    })
      .select(select)
      .limit(limit)
      .skip(skip)
      .sort(req.query.sort || '-createdAt');
      
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
    const product = await Product.create({
      ...req.body,

      merchant: req.user._id,
    });

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

    const product = await Product.findById(id);

    if (product.merchant.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: 'You are not authorized to update this product',
      });
    }

    //! This will hamper speed
    // const updated_product = await Product.findByIdAndUpdate(
    //   id,
    //   {
    //     $set: {
    //       title: 'Updated Title',
    //     },
    //     $push: {
    //       images: 'https://images.unsplash.com/photo-1610390000000-1b1b1b1b1b1b',
    //     },
    //     $pop: {
    //       images: 1,
    //     },
    //     $inc: {
    //       price: 10,
    //     },
    //   },
    //   {
    //     new: true,
    //   }
    // );

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

  const product = await Product.findByIdAndDelete(id);

  if (product.merchant.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: 'You are not authorized to delete this product',
    });
  }

  res.json({
    message: `Product with id: ${id} deleted`,
    state: 'success',
  });
};

async function generateProductArray(id) {
  const url = 'https://picsum.photos/200/300';
  const options = {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  };

  const imagesPromise = [];

  for (let i = 0; i < 500; i++) {
    const image = getRedirectedUrl(url, options);
    imagesPromise.push(image);
  }

  const imagesURLs = await Promise.all(imagesPromise);

  const titles = [
    'Luxury Watch',
    'Leather Handbag',
    'Smartphone',
    'Wireless Earbuds',
    'Fitness Tracker',
  ];
  const descriptions = [
    'This high-end watch is perfect for any occasion.',
    'Crafted from genuine leather, this handbag is both stylish and practical.',
    'Stay connected on the go with this powerful smartphone.',
    'Experience wireless freedom with these earbuds.',
    'Track your fitness goals and stay motivated with this smart fitness tracker.',
  ];
  const brands = ['Rolex', 'Gucci', 'Apple', 'Sony', 'Fitbit'];
  const categories = ['Watches', 'Bags', 'Phones', 'Audio', 'Fitness'];

  // Create an empty array to store the product objects
  const products = [];

  for (let i = 0; i < 1000; i++) {
    // Generate a random number between 0 and 4 to select a title, description, brand, and category
    const randomIndex = Math.floor(Math.random() * 5);
    // Generate a random price between 10 and 100
    const price = Math.floor(Math.random() * 91) + 10;

    // Generate an array of random images with a length between 1 and 5
    const images = [];

    for (let j = 0; j < 5; j++) {
      const randomIndex = Math.floor(Math.random() * 300);
      images.push(imagesURLs[randomIndex]);
    }

    // Generate a random thumbnail image URL
    const thumbnail = imagesURLs[Math.floor(Math.random() * 300)];

    // Create a new product object with the generated properties
    const product = {
      title: titles[randomIndex],
      description: descriptions[randomIndex],
      price: price,
      images: images,
      thumbnail: thumbnail,
      brand: brands[randomIndex],
      category: categories[randomIndex],
      merchant: id,
    };

    // Add the new product object to the products array
    console.log(product);
    products.push(product);
  }

  // Return the completed array of products
  return products;
}

const dummy = async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      message: 'You are not authorized to perform this action',
    });
  }

  const products = await generateProductArray(user._id);

  const data = await Product.insertMany(products);

  res.json({
    message: `Product with id:  deleted`,
    state: 'success',
    data,
  });
};

const look_up = async (req, res, next) => {
  const { search } = req.params;

  const products = await Product.find({
    $or: [
      {
        title: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        description: {
          $regex: search,
          $options: 'i',
        },
      },
    ],
  });

  res.json({
    message: 'Look up',
    state: 'success',
    data: products,
  });
};

module.exports = {
  get_all_products,
  add_product,
  update_product,
  delete_product,
  get_product,
  dummy,
  look_up,
};
