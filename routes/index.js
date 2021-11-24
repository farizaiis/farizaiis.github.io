const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');
const contactCustRoutes = require('./contactCustRoutes');

router.use('/admin', adminRoutes);
router.use('/contact-customer', contactCustRoutes)

module.exports = router;
