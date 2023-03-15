const User = require('../database/models/user.model');

const send_request = async (req, res, next) => {
  const { id } = req.params; // User ID of the user to whom the request is being sent

  const toUser = await User.findByIdUpdate(
    {
      _id: id,
    },
    {
      $push: {
        requests: req.user._id,
      },
    }
  ); // send request to the user

  const meUser = await User.findByIdAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $push: {
        requestsSent: id,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Request sent',
  });
};

const get_requests = async (req, res, next) => {
  const requests = await User.findById(req.user._id).select('requests').populate({
    path: 'requests',
    select: 'name photo _id',
  });

  res.status(200).json({
    status: 'success',
    data: requests,
  });
};

const accept_request = async (req, res, next) => {
  const { id } = req.params; // User ID of the user who sent the request

  const meUser = await User.findByIdAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $pull: {
        requests: id,
      },
      $push: {
        followers: id,
      },
    }
  );

  const otherUser = await User.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        requestsSent: req.user._id,
      },
      $push: {
        following: req.user._id,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Request accepted',
  });
};

const reject_request = async (req, res, next) => {
  const { id } = req.params; // User ID of the user who sent the request

  const meUser = await User.findByIdAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $pull: {
        requests: id,
      },
    }
  );

  const otherUser = await User.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        requestsSent: req.user._id,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Request rejected',
  });
};

const cancel_request = async (req, res, next) => {
  const { id } = req.params; // User ID of the user to whom the request was sent

  const meUser = await User.findByIdAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $pull: {
        requestsSent: id,
      },
    }
  );

  const otherUser = await User.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        requests: req.user._id,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Request cancelled',
  });
};
