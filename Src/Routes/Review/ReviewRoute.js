const express = require('express');
const { getAllReview, createReview } = require('../../Controller/ReviewCOntroler');
const router = express.Router();

router.get('/',getAllReview)
router.post( '/' , createReview)
 
module.exports = router;