import db from '../models';

const commentController = {};

commentController.getAll = async (req, res) => {
  try {
    const comments = await db.Comment.find({});

    res.status(200).json({
      success: true,
      data: comments.map(n => n.isDeleted ? { deleted: true, date: n.updatedAt } : n)
    });
  } catch (err) {
    res.status(500).json({
      message: err.toString()
    });
  }
};

commentController.getChildComments = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await db.Post.find({ _parent: id });
    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (err) {
    res.status(500).json({
      message: err.toString()
    });
  }
};

commentController.create = async (req, res) => {
  const { text, userId, parentId, parentIsPost } = req.body;

  const comment = new db.Comment({ text, parentIsPost, _parent: parentId, _author: userId });

  try {
    const newComment = await comment.save();
    const parent = parentIsPost ? await db.Post.findById(parentId) : await db.Comment.findById(parentId);

    await parent.update({ $push: { '_children': newComment._id } })
    res.status(201).json({
      success: true,
      data: parent
    });
  } catch (err) {
    res.status(500).json({
      message: err.toString()
    });
  }
};

commentController.submitVote = async (req, res) => {
  req.check('userId', '.').notEmpty();
  req.check('value', 'Error processing vote.').notEmpty();

  const errors = req.validationErrors();
  if (errors) res.status(400).json({ message: errors[0].msg });

  const { userId, value } = req.body;

  try {
    let vote = await db.Vote.findOneAndUpdate(
      { _user: userId, _parent: req.params.id },
      { value: value }
    );

    if (vote) {
      vote = new db.Vote({
        _user: userId,
        _parent: req.params.id,
        value: value
      });
      await vote.save();
    }
    const parentComment = await db.Comment.findByIdAndUpdate(
      req.params.id
    );

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error.' });
  }
};

export default commentController;
