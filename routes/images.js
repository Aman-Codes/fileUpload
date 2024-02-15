const express = require('express');
const router = express.Router();
const { requireSignin, isAdmin } = require('../middlewares/auth');
const { getUserImages, getAllUserImages } = require('../controllers/images');

router.get('/admin', requireSignin, isAdmin, getAllUserImages);
router.get('/:id', requireSignin, getUserImages);

module.exports = router;