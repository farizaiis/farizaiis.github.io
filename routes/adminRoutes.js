const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');

router.post('/signup', admin.signup);
router.post('/login', admin.signin);

module.exports = router;