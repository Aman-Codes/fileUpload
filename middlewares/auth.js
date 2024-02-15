const {expressjwt} = require('express-jwt');

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

exports.isAdmin = (req, res, next) => {
  if (!req.auth.isAdmin) return res.status(401).json({
    success: false,
    error: 'Unauthorized user',
  });
  next();
};