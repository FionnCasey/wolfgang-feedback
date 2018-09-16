import db from '../models';
import { comparePasswords, signJwt } from '../utils';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const userController = {};

const capitaliseWord = word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();

const sendConfirmationEmail = async (user, req, res) => {
  // Create email confirmation token.
  const token = new db.Token({
    _userId: user._id,
    token: crypto.randomBytes(16).toString('hex')
  });
  await token.save();

  const transporter = nodemailer.createTransport({
    service: 'Sendgrid',
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  const mailOptions = {
    from: 'no-reply@awarewolf.com',
    to: user.email,
    subject: 'Awarewolf Account Verification',
    text: `Hi ${capitaliseWord(user.username)},\n\n` +
          `Please verify your email by clicking the following link: \nhttp:\/\/${req.headers.host}\/auth\/confirm\/${token.token}.\n`
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log('Error: ', err);
      return res.status(500).json({ messages: ['Error sending verification email.'] });
    }
    return res.status(200).json({ success: true, data: `A verification email has beed sent to ${user.email}.` });
  });
};

userController.login = async (req, res) => {
  req.check('email', 'Email is not valid.').isEmail();
  req.check('email', 'Email cannot be blank.').notEmpty();
  req.check('password', 'Password cannot be blank.').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors.
  const errors = req.validationErrors();
  if (errors) return res.status(400).json({ messages: errors.map(e => e.msg) });

  try {
    const user = await db.User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ messages: ['Email address not found.'] });
    
    if (!comparePasswords(req.body.password, user.password)) return res.status(401).json({ messages: 'Invalid email or password.' });

    if (!user.isVerified) return res.status(401).json({ messages: ['Account has not been verified.'] });

    res.status(200).json({
      success: true,
      data: {
        username: user.username,
        id: user._id,
        token: signJwt(user)
      }
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ messages: ['Database error.'] });
  }
};

userController.create = async (req, res) => {
  req.check('email', 'Email is not valid.').isEmail();
  req.check('email', 'Email cannot be blank.').notEmpty();
  req.check('password', 'Password must be at least 8 characters long.').len(8);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors.
  const errors = req.validationErrors();
  if (errors) return res.status(400).json({ messages: errors.map(e => e.msg) });

  try {
    let user = await db.User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ messages: ['Email is already in use.'] });

    // Check if Wolfgang email.
    if (req.body.email.split('@')[1] !== 'wolfgangdigital.com') {
      return res.status(401).json({ messages: ['Must be a valid Wolfgang email.'] });
    }

    const username = req.body.email.split('@')[0].replace('_', ' ').replace('.', ' ');
    user = new db.User({
      username,
      password: req.body.password,
      email: req.body.email
    });
    await user.save();
    
    await sendConfirmationEmail(user, req, res);
    
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ messages: ['Database error.'] });
  }
};

userController.confirmEmail = async (req, res) => {
  try {
    const token = await db.Token.findOne({ token: req.params.token });
    if (!token) return res.status(400).send('Unable to find a valid token. Your token may have expired.');

    const user = await db.User.findOne({ _id: token._userId });

    if (!user) return res.status(400).send('Unable to find a user associated with this token.');

    if (user.isVerified) return res.status(400).send('User already verified.');

    await user.update({ $set: { 'isVerified': true }});
    res.status(200).send('Your account has been verified. You may log in now.');

  } catch (err) {
    console.log('Error: ', err);
    res.status(500).send('Database error.');
  }
};

userController.resendToken = async (req, res) => {
  req.check('email', 'Email is not valid.').isEmail();
  req.check('email', 'Email cannot be blank.').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check validation errors.
  const errors = req.validationErrors();
  if (errors) return res.status(400).json({ messages: errors.map(e => e.msg) });

  try {
    const user = await db.User.findOne({ email: req.email });

    if (!user) return res.status(400).json({ messages: ['Unable to find a user with this email.'] });

    if (user.isVerified) return res.status(400).json({ messages: ['This account has already been verfied.'] });

    await sendConfirmationEmail(user, req, res);

  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ messages: ['Database error.'] });
  }
};

export default userController;
