const express = require("express");
const multer  = require("multer");
const {storage, handleMultipleUploads} = require("../controllers/upload");
const { requireSignin } = require('../middlewares/auth');

const router = express.Router();
const upload = multer({ storage: storage });

router.post('/', requireSignin, upload.array('files', 12), handleMultipleUploads)

module.exports = router;