import db from '../models';

const commentController = {};

commentController.findByPostId = async (req, res) => {
  req.check('id', 'No post ID.').notEmpty();

  // Check for validation errors.
  const errors = req.validationErrors();
  if (errors) return res.status(400).json({ messages: errors.map(e => e.msg) });

  try {
    // Get root comments from post ID.
    const comments = await db.Comment.find({ _parent: req.params.id });

    // Include child comments if enabled.
    if (process.env.COMMENT_NESTING === 'enabled') {
      await comments.populate({
        path: '_comments',
        match: { isDeleted: false },
        populate: {
          path: '_comments',
          match: { isDeleted: false }
        }
      });
    }
    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ messages: ['Database error.'] });
  }
};

commentController.comment = async (req, res) => {
  req.check('id', 'No parent ID.').notEmpty();
  req.check('text', 'Text cannot be blank.').notEmpty();

  // Check for validation errors.
  const errors = req.validationErrors();
  if (errors) return res.status(400).json({ messages: errors.map(e => e.msg) });

  // Check if parent 

  try {
    const post = await db.Post.findById(req.params.id);
    if (!post) return res.status(400).json({ messages: ['Invalid post ID.'] });

    if (post.isDeleted) return res.status(400).json({ messages: ['This post has been deleted.'] });

    if (post.isResolved) return res.status(400).json({ messages: ['This post has been resolved.'] });

    const comment = new db.Comment({
      _author: req.params.id,
      _parent: pos
    });

  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ messages: ['Database error.'] });
  }
};

export default commentController;
