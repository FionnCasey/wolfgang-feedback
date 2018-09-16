import db from '../models';

const postController = {};

postController.fetch = async (req, res) => {
  try {
    const posts = await db.Post.find({ isDeleted: false })
      .populate({
        path: '_comments',
        select: '-isDeleted'
      });
    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ messages: ['Database error.'] });
  }
};

postController.findById = async (req, res) => {
  req.check('id', 'No post ID.').notEmpty();

  // Check for validation errors.
  const errors = req.validationErrors();
  if (errors) return res.status(400).json({ messages: errors.map(e => e.msg) });

  try {
    const post = await db.Post.findById(req.params.id);
    if (!post) return res.status(400).json({ messages: ['Unable to locate post.'] });

    if (post.isDeleted) return res.status(400).json({ messages: ['This post has been deleted.'] });

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ messages: ['Database error.'] });
  }
};

postController.create = async (req, res) => {
  req.check('title', 'Title must be at least 6 characters.').len(6);
  req.check('text', 'Text must be at least 1 character.').len(1);

  // Check for validation errors.
  const errors = req.validationErrors();
  if (errors) return res.status(400).json({ messages: errors.map(e => e.msg) });

  const post = new db.Post({
      title: req.body.title,
      text: req.body.text,
      _author: req.user._id
  });

  try {
    await post.save();
    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ messages: ['Database error.'] });
  }
};

postController.vote = async (req, res) => {
  req.check('id', 'Post ID cannot be blank.').notEmpty();
  req.check('value', 'Value cannot be blank.').notEmpty();
  req.check('value', 'Value must be 1 or -1.').isIn([1, -1]);

  // Check for validation errors.
  const errors = req.validationErrors();
  if (errors) return res.status(400).json({ messages: errors.map(e => e.msg) });

  const { value } = req.body;

  try {
    const post = await db.Post.findById(req.params.id);
    if (!post) return res.status(400).json({ messages: ['Unable to locate post.'] });

    let vote = await db.Vote.findOne({ _user: req.user._id, _parent: req.params.id });
    console.log('vote:', vote)
    if (!vote) {
      // No vote yet so add a new one.
      vote = new db.Vote({ _user: req.user._id, _parent: req.params.id, value });
      await vote.save();
      await post.update({ $push: { '_votes': vote._id } });
      console.log('new: ', vote.value, value)
    } else if (vote.value === value) {
      // Same vote value so remove.
      console.log('same:', vote.value, value)
      await post.update({ $pull: { '_votes': vote._id } });
      await db.Vote.findByIdAndRemove(vote._id);

    } else {
      // Different vote value so update.
      console.log('different')
      await vote.update({ $set: { 'value': value } });
    }
    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ messages: ['Database error.'] });
  }
};

export default postController;