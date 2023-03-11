const express = require('express');

const auth_router = require('./auth.routes');
const product_router = require('./product.routes');
const cart_router = require('./cart.routes');
const payment_router = require('./payment.routes');
const reset_router = require('./reset.routes');
const multer = require('multer');
const os = require('os');

const index_router = express.Router();

index_router.use('/auth', auth_router);
index_router.use('/product', product_router);
index_router.use('/cart', cart_router);
index_router.use('/payment', payment_router);
index_router.use('/reset', reset_router);

const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  let ipAddress;

  Object.keys(interfaces).forEach((interfaceName) => {
    const interfaceData = interfaces[interfaceName];
    interfaceData.forEach((data) => {
      if (data.family === 'IPv4' && !data.internal) {
        ipAddress = data.address;
      }
    });
  });

  return ipAddress;
};

const uploader = multer({
  storage: multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
  }),
});

index_router.post('/upload', uploader.single('image'), (req, res) => {
  const { file } = req;
  const { filename } = file;
  const IP = getIPAddress();
  const port = process.env.PORT || 5000;
  const url = `http://${IP}:${port}/${filename}`;
  res.json({ url });
});

module.exports = index_router;
