import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const TOKEN_MAX_AGE = '8h';

const verifyJWT = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) return reject(err);
      resolve(decodedToken);
    });
  });
};

const createJWT = details => {
  if (typeof details !== 'object') details = {};
  if (!details || typeof details.maxAge !== 'number') details.maxAge = TOKEN_MAX_AGE;

  details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
    if (typeof val !== 'function' && key !== 'password') {
      memo[key] = val;
    }
    return memo;
  }, {});

  const token = jwt.sign(
    { data: details.sessionData },
    process.env.JWT_SECRET,
    {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
    }
  );
  return token;
};

const verifyJWTMiddleware = (req, res, next) => {
  const token = req.method === 'POST' ? req.header.token : req.query.token;
  verifyJWT(token).then(decodedToken => {
    req.user = decodedToken.data;
    next();
  })
  .catch(err => {
    res.status(400).json({
      message: 'Invalid auth token provided.'
    });
  });
};

const comparePasswords = (a, b) => bcrypt.compareSync(a, b);

export {
  comparePasswords
};
