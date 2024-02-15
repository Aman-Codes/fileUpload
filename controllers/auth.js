const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec()
  .then((user) => {
    if (user) {
      return res.status(400).json({
        success: false,
        error: 'Email is taken',
      });
    }
    const newUser = new User({ name, email, password });
    return newUser.save();
  })
  .then(() => {
    return res.json({
      success: true,
      message: 'Successfully registered! Please Login',
    });
  })
  .catch(err => {
    console.log("Error occured in registering user", err);
    return res.status(400).json({
      success: false,
      error: 'Error occured in registering user',
    });
  })
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec()
  .then((user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'User with that email does not exist. Please signup',
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        success: false,
        error: 'Email and password do not match',
      });
    }

    const { _id, name,isAdmin } = user;
    const token = jwt.sign({ _id, name, email, isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.json({
      success: true,
      token,
      user: { _id, name, email, isAdmin },
    });
  })
  .catch(err => {
    console.log("Error Occured in user signin", err);
    return res.status(400).json({
      success: false,
      error: 'Error occured in user signin',
    });
  })
};
