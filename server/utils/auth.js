import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';

const MAX_AGE = '3h';

const signJwt = ({ _id }) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: MAX_AGE });
};

const verifyJwt = (req, res, next) => {
  if (!req.headers.token) return res.status(401).json({ message: ['No authorisation token.'] });

  // Verify token.
  jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) return res.status(401).json({ message: ['Invalid authorisation token.'] });
    // Check is a valid user.
    db.User.findById(decodedToken._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        console.log('Error: ', err);
        return res.status(400).json({ message: 'Unable to locate user.' });
      });
  });
};

const comparePasswords = (a, b) => bcrypt.compareSync(a, b);

export {
  signJwt,
  verifyJwt,
  comparePasswords
};
