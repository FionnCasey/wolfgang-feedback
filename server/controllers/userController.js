import db from '../models';
import comparePasswords from '../libs/auth';

const userController = {};

userController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: `Unable to locate user: ${email}.`
      });
    }
    if (comparePasswords(password, user.password)) {
      res.status(200).json({
        success: true,
        data: { username: user.username, id: user._id }
      });
    } else {
      res.status(401).json({
        message: 'Incorrect password.'
      });
    }
  } catch(err) {
    res.status(500).json({
      message: err.toString()
    });
  }
};

userController.create = async (req, res) => {
  const { email, password } = req.body;
  const username = email.split('@')[0];

  if (email.split('@')[1] !== 'wolfgangdigital.com') {
    return res.status(403).json({
      message: 'Invalid email address.'
    });
  }

  const user = new db.User({ username, email, password });

  try {
      const newUser = await user.save();
      res.status(201).json({
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
