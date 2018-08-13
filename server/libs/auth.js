import jwt from 'jsonwebtoken';

export function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {

    });
  });
}