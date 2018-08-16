import db from '../models';

const postController = {};

postController.getAll = async (req, res) => {
    try {
        const posts = await db.Post.find({ isDeleted: false });
        return res.status(200).json({
            success: true,
            data: posts
        });
    } catch(err) {
        res.status(500).json({
            message: err.toString()
        });
    }
};

postController.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await db.Post.findById(id);

        if (!post) {
          return res.status(500).json({
            message: 'Error locating post.'
          });
        }

        if (post.isDeleted) {
          return res.status(500).json({
            message: 'This post has been deleted.'
          });
        }

        return res.status(200).json({
            success: true,
            data: post
        });
    } catch(err) {
        res.status(500).json({
            message: err.toString()
        });
    }
};

postController.update = async (req, res) => {
  const { userId, id } = req.params;
  const { newTitle, newText } = req.body;

  try {
    const { title, text } = await db.Post.findOne({ _id: id, _author: userId, isDeleted: false });

    const updatedPost = await db.Post.findOneAndUpdate(
      { _id: id, _author: userId },
      { title: newTitle || title, text: newText || text },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedPost
    });

  } catch(err) {
    res.status(500).json({
      message: err.toString()
    });
  }
};

postController.create = async (req, res) => {
    const { title, text, userId } = req.body;

    // TODO: Validate. Get UID from JWT

    const post = new db.Post({ title, text, _author: userId });

    try {
        const newPost = await post.save();
        res.status(201).json({
            success: true,
            data: newPost
        });
    } catch (err) {
      res.status(500).json({
        message: err.toString()
      });
    }
};

postController.delete = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    await db.Post.findOneAndUpdate({
      _id: id, _author: userId
    }, { isDeleted: true });

    res.status(200).json({ success: true });

  } catch(err) {
      res.status(500).json({
        message: err.toString()
      });
  }
};

export default postController;
