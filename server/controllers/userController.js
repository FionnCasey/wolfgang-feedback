import db from '../models';

const userController = {};

userController.create = async (req, res) => {
    const { email, password } = req.body;
    const username = email.split('@')[0];

    if (email.split('@')[1] !== 'wolfgangdigital.com') {
      res.status(403).json({
        message: 'Invalid email address.'
      });
      return;
    }

    // TODO: Validate - Encrypt

    const user = new db.User({
        username,
        email,
        password
    });
    try {
        const newUser = await user.save();
        res.status(200).json({
            success: true,
            data: newUser
        });
    } catch (err) {
        res.status(500).json({
            message: err.toString()
        });
    }
};

export default userController;
