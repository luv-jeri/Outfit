const Contract = require('../database/models/contract.model');

module.exports.update = async (req, res, next) => {
  const { id } = req.params;

  const { status } = req.body;

  const { _id } = req.user;

  const contract = await Contract.findOne({
    merchant: _id,
    _id: id,
  });

  if (!contract) {
    return next(new AppError('No contract found with that ID', 404));
  }

  contract.status = status;

  await contract.save();

  // if (status === 'accepted') {
  //   if (contract.status === 'pending') {
  //     contract.status = status;
  //     await contract.save();
  //   } else {
  //     return next(new AppError('Contract already accepted', 400));
  //   }
  // }

  // if (status === 'rejected') {
  //   if (contract.status === 'pending' || contract.status === 'accepted') {
  //     contract.status = status;
  //     await contract.save();
  //   } else {
  //     return next(new AppError('Contract already rejected', 400));
  //   }
  // }

  // if (status === 'deispatched') {
  //   if (contract.status === 'accepted') {
  //     contract.status = status;
  //     await contract.save();
  //   } else {
  //     return next(new AppError('Contract not accepted', 400));
  //   }
  // }

  // if (status === 'delivered') {
  //   if (contract.status === 'deispatched') {
  //     contract.status = status;
  //     await contract.save();
  //   } else {
  //     return next(new AppError('Contract not deispatched', 400));
  //   }
  // }

  res.status(200).json({
    status: 'success',
    data: {
      contract,
    },
  });
};

module.exports.get_all_contracts = async (req, res, next) => {
  const { _id } = req.user;

  const contracts = await Contract.find({
    merchant: _id,
  }).populate('product');

  res.status(200).json({
    status: 'success',
    data: {
      contracts,
    },
  });
};

module.exports.get_contract = async (req, res, next) => {
  const { _id } = req.user;

  const { id } = req.params;

  const contract = await Contract.findOne({
    merchant: _id,
    _id: id,
  }).populate('product');

  if (!contract) {
    return next(new AppError('No contract found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      contract,
    },
  });
};
