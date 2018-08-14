import db from '../models';

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
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );
      res.status(200).json({
        success: true,
        data: { user, token }
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
