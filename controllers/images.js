const User = require('../models/User');

exports.getAllUserImages = (req,res) => {
  User.find({}).exec()
  .then((users) => {
    console.log("users", users);
    return res.json({
      success: true,
      data: users,
    });
  })
  .catch(err => {
    console.log("Error occured in fetching all users", err);
    return res.status(400).json({
      success: false,
      error: 'Error occured in fetching all users',
    });
  });
};

exports.getUserImages = (req,res) => {
  const id = req.params.id;
  User.findById(id).exec()
  .then((data) => {
    console.log("data", data);
    return res.json({
      success: true,
      data: data.imageUrls,
    });
  })
  .catch(err => {
    console.log("Error occured in fetching user data", err);
    return res.status(400).json({
      success: false,
      error: 'Error occured in fetching user data',
    });
  });
};