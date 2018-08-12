import db from '../models';

const commentController = {};

commentController.get = async (req, res) => {
    try {
        const comments = await db.Comment.find({});
        return res.status(200).json({
            success: true,
            data: comments
        });
    } catch(err) {
        res.status(500).json({
            message: err.toString()
        });
    }
};

commentController.create = async (req, res) => {
    const {
        text,
        userId,
				postId,
        parentCommentId
    } = req.body;

    // TODO: Validate. JWT..

    const comment = new db.Comment({
        text,
				_post: postId,
        _author: userId
    });

    try {
        let newComment = await comment.save();
				const parentPost = await db.Post.findByIdAndUpdate(
					postId,
					{ $push: { '_children': newComment._id } }
				);
        if (parentCommentId) {
          newComment = await db.Comment.findByIdAndUpdate(
            parentCommentId,
            { $push: { '_children': newComment._id } }
          );
        }
        res.status(200).json({
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
