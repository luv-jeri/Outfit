const Comment = require('../database/models/product.model');

const addComment = async (req, res, next) => {
  const { id } = req.params; // Post ID
  const { comment, parentComment } = req.body; // parent comment ID is the ID of the comment to which the current comment is replying to

  const new_comment = await Comment.create({
    commentedBy: req.user._id,
    postID: id,
    comment,
    parentComment, // it will be null if the comment is not a reply to any other comment
  });

  res.status(200).json({
    status: 'success',
    message: 'Comment added',
    data: new_comment,
  });
};

const getPostComments = async (req, res, next) => {
  const { id } = req.params;

  const comments = await Comment.find({ postID: id, parentComment: null }).populate({
    path: 'commentedBy',
    select: 'name photo _id',
  });

  res.status(200).json({
    status: 'success',
    data: comments,
  });
};

const getReplyComments = async (req, res, next) => {
  const { id } = req.params; // Comment ID

  const comments = await Comment.find({ parentComment: id }).populate({
    path: 'commentedBy',
    select: 'name photo _id',
  });

  res.status(200).json({
    status: 'success',
    data: comments,
  });
};

const deleteComment = async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (comment.commentedBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
  }

  await comment.remove();

  res.status(200).json({
    status: 'success',
  });
};

const updateComment = async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (comment.commentedBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
  }

  const { comment: newComment } = req.body;

  comment.comment = newComment;

  await comment.save();

  res.status(200).json({
    status: 'success',
    message: 'Comment updated',
    data: comment,
  });
};

module.exports = {
  addComment,
  getPostComments,
  getReplyComments,
  deleteComment,
  updateComment,
}
