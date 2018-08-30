import db from '../models';

const commentController = {};

commentController.getAll = async (req, res) => {
    try {
        const comments = await db.Comment.find({});

        res.status(200).json({
            success: true,
            data: comments.map(n => n.isDeleted ? { deleted: true, date: n.updatedAt } : n)
        });
    } catch(err) {
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
            data: newComment
        });
    } catch (err) {
        res.status(500).json({
            message: err.toString()
        });
    }
};

export default commentController;
