import db from '../models';
import { comparePasswords, signJwt } from '../utils';

const userController = {};

userController.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Missing login details.' });

  try {
    const user = await db.User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: `Unable to locate user: ${email}.`
      });
    }
    if (comparePasswords(password, user.password)) {
      const token = signJwt(user);
      return res.status(200).json({
        success: true,
        data: { username: user.username, _id: user._id, token, loggedIn: true }
      });
    } else {
      return res.status(401).json({
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

  if (!email || !password) return res.status(400).json({ message: 'Missing signup details.' });

  const existing = await db.User.findOne({ email });
  if (existing) {
    return res.status(400).json({
      message: 'Email already exists.'
    });
  }

  const username = email.split('@')[0];

  if (email.split('@')[1] !== 'wolfgangdigital.com') {
    return res.status(403).json({
      message: 'Invalid email address.'
    });
  }

  const user = new db.User({ username, email, password });

  try {
      const newUser = await user.save();
      const token = signJwt(newUser);
      return res.status(201).json({
          success: true,
          data: { username: newUser.username, _id: newUser._id, token, loggedIn: true }
      });
  } catch (err) {
    res.status(500).json({
        message: err.toString()
    });
  }
};

export default userController;
