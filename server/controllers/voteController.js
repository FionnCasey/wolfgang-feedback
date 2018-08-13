import db from '../models';

const voteController = {};

voteController.create = async (req, res) => {
  const { userId, parentId, parentIsPost, value } = req.body;

  const voteValue = Math.max(-1, Math.min(1, value));
  
  const vote = new db.Vote({ _user: userId, _parent: parentId, parentIsPost, value: voteValue });

  try {
    const existingVote = await db.Vote.findOne({ _user: userId, _parent: parentId });

    if (existingVote) {
      return res.status(403).json({
        message: 'Error: Duplicate vote.'
      });
    }

    const newVote = await vote.save();
    const parent = parentIsPost ? await db.Post.findById(parentId) : await db.Comment.findById(parentId);

    await parent.update({ $push: { '_votes': newVote._id } })
    res.status(201).json({ success: true });

  } catch(err) {
    res.status(500).json({
      message: err.toString()
    });
  }
};

export default voteController;
