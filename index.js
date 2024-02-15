const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const db = process.env.MONGODB_URL || "mongodb://localhost/zomato";
require("dotenv").config();
const port = process.env.PORT || 5000;

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("Mongoose connected with db",db))
  .catch((err) => console.log(err));

// use routes
app.use("/api/status", require("./routes/status"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/images", require("./routes/images"));
app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`server started on port ${port}`));