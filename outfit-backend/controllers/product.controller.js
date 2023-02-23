const Product = require('../database/models/product.model');

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

    let products = await Product.find().select(select).limit(limit).skip(skip);

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

function generateProductArray() {
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
    const numImages = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < numImages; j++) {
      const imageIndex = Math.floor(Math.random() * 10) + 1;
      images.push(`https://picsum.photos/200/300`);
    }

    // Generate a random thumbnail image URL
    const thumbnailIndex = Math.floor(Math.random() * 10) + 1;
    const thumbnail = `https://picsum.photos/200/300`;

    // Create a new product object with the generated properties
    const product = {
      title: titles[randomIndex],
      description: descriptions[randomIndex],
      price: price,
      images: images,
      thumbnail: thumbnail,
      brand: brands[randomIndex],
      category: categories[randomIndex],
    };

    // Add the new product object to the products array
    products.push(product);
  }

  // Return the completed array of products
  return products;
}

const dummy = async (req, res, next) => {
  const products = generateProductArray();

  const data = await Product.insertMany(products);

  res.json({
    message: `Product with id:  deleted`,
    state: 'success',
    data,
  });
};

module.exports = {
  get_all_products,
  add_product,
  update_product,
  delete_product,
  get_product,
  dummy,
};
