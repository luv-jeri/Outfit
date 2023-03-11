const User = require('../database/models/user.model');
const Order = require('../database/models/order.model');

module.exports.get_order = async (req, res, next) => {
  const { _id } = req.user;

  const orders = await Order.find({ user: _id }).populate({
    path: 'contracts',
    select: 'product total quantity status',
    populate: {
      path: 'product',
      select: 'title price thumbnail',
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
};

module.exports.remove = async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
