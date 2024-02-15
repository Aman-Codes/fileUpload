const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const multer  = require("multer");
const User = require('../models/User');

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const uploadToCloudinary = async (locaFilePath) => {
  // locaFilePath: path of image which was just uploaded to "uploads" folder
  return cloudinary.uploader.upload(locaFilePath,{
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  })
  .then((result) => {
    // Image has been successfully uploaded on cloudinary
    // So we dont need local image file anymore
    // Remove file from local uploads folder 
    fs.unlinkSync(locaFilePath)
    return {
      success: true,
      url:result.url
    };
  }).catch((error) => {
    console.log("error is", error);
    // Remove file from local uploads folder 
    fs.unlinkSync(locaFilePath)
    return {success: false,error: error};
  });
}

exports.handleMultipleUploads = async (req, res) => {
  // req.files is array of `profile-files` files
  // req.body will contain the text fields, if there were any
  const imageUrlList = []
  console.log("req.files",req.files);
  for(let i=0;i<req.files.length;i++){
    const locaFilePath = req.files[i].path;
    const result = await uploadToCloudinary(locaFilePath);
    imageUrlList.push(result.url);
  }
  const id = req.auth._id;
  console.log("id is", id);
  User.findByIdAndUpdate(id,
    { $push: { imageUrls: { $each: imageUrlList } } },
    { $new: true }
    ).exec()
  .then(response => {
    console.log("response", response);
    res.json({
      success: true,
      data: imageUrlList
    });
  })
  .catch(error => {
    console.log("error is", error);
    res.status(400).json({
      success: false,
      error: error
    })
  })  
}