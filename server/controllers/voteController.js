import db from '../models';

const voteController = {};

voteController.create = async (req, res) => {
  const { userId, parentId, parentIsPost, value } = req.body;

  const voteValue = Math.max(-1, Math.min(1, value));

  const vote = new db.Vote({ _user: userId, _parent: parentId, parentIsPost, value: voteValue });

  try {
    const existingVote = await db.Vote.findOne({ _user: userId, _parent: parentId });
    const parent = parentIsPost ? await db.Post.findById(parentId) : await db.Comment.findById(parentId);

    if (existingVote) {
      await db.Vote.findOneAndUpdate(
        { _user: userId, _parent: parentId },
        { value: voteValue === existingVote.value ? 0 : value }
      );
      return res.status(200).json({
        success: true,
        data: parent
      });
    }

    const newVote = await vote.save();

    await parent.update({ $push: { '_votes': newVote._id } })
    return res.status(200).json({ success: true });

  } catch(err) {
    return res.status(500).json({
      message: err.toString()
    });
  }
};

export default voteController;
