const express = require('express');
const router = express.Router();
const contactCustomer = require('../controllers/contactCustContoller');
const { loginCheck } = require('../middlewares/authentication');


router.post('/', contactCustomer.createData);
router.get('/', loginCheck, contactCustomer.getAllData);
router.get('/:id', loginCheck, contactCustomer.getOneData);
router.put('/:id', loginCheck, contactCustomer.updateData);
router.delete('/:id', loginCheck, contactCustomer.deleteData);

module.exports = router;