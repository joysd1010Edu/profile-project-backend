const express = require('express');
const { addToCart, getCart, deleteFromCart } = require('../../Controller/CartController');
const router = express.Router();


router.post('/',addToCart)
router.get('/',getCart)
router.delete('/:id',deleteFromCart)

module.exports = router;
