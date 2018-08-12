import db from '../models';

const postController = {};

postController.get = async (req, res) => {
    try {
        const posts = await db.Post.find({});
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

postController.create = async (req, res) => {
    const {
        title,
        text,
        userId // TODO: Extract using JWT.
    } = req.body;

    // TODO: Validate.

    const post = new db.Post({
        title,
        text,
        _author: userId
    });

    try {
        const newPost = await post.save();
        res.status(200).json({
            success: true,
            data: newPost
        });
    } catch (err) {
        res.status(500).json({
            message: err.toString()
        });
    }
};

export default postController;
