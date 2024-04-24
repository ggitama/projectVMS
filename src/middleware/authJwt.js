const jwt = require('jsonwebtoken');
const config = require("../configs/auth.config.js");
const { jwtDecode } = require("jwt-decode");
const secretKey = 'your-secret-key';
const jws = require('jws');

// verifyToken = (req, res, next) => {
//   const usertoken = req.headers.authorization;
// const token = usertoken.split(' ')[1];

// if (!token) {
//   return res.status(401).json({ message: 'No token provided' });
// }
// console.log(token);
//   console.log(secretKey);
// // Verify and decode the token
// const decoded = jwt.verify(token, secret);
//     return { success: true, data: decoded };
// };

function verifyAccessToken(token) {
  const secret = 'secret';

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function authJwt(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];
  // const token = authHeader.split(' ')[1];
  const secret = '^token*secret';

  // console.log(authHeader);
  console.log(token);
  if (!token) {
    return res.sendStatus(401);
  }
  // const decodedToken = jwt.decode(token, { complete: true });
  // console.log(decodedToken.signature);

  // const result = jwt.verify(token, secret);

  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      // console.log(err);

      return res.status(403).json({ error: 'Unauthorized.' });
    }

    // console.log(decoded);
    next();
  });

  // console.log(result);
  // if (!result.success) {
  //   return res.status(403).json({ error: result.error });
  // }
  // req.user = result.data;
  // next();

  // return res.status(500).json({ error: 'Whoops, looks like something went wrong.' });
}

// const authJwt = {
//   verifyToken: verifyToken
// };
module.exports = {verifyAccessToken, authJwt};