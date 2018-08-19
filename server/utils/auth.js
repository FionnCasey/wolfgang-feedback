import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const MAX_AGE = '6h';

const signJwt = ({ _id }) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: MAX_AGE });
};

const verifyJwt = (req, res, next) => {
  if (!req.headers.token) return res.status(403).json({ message: 'No authorisation token.' });
  jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) return res.status(403).json({ message: 'Authorisation token invalid.' });

    // TODO: Check token id against user db.
    next();
  });
};

const comparePasswords = (a, b) => bcrypt.compareSync(a, b);

export {
  signJwt,
  verifyJwt,
  comparePasswords
};
