const express = require('express');
const { getAllPhone, getByBrand, getSinglePhoneData } = require('../../Controller/PhoneController');
const router = express.Router();


router.get('/', getAllPhone);
router.get('/:brand', getByBrand);
router.get('/detail/:id',getSinglePhoneData)


module.exports = router;