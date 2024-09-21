const express = require('express');
const { getAllQuestion, createQuestion } = require('../../Controller/QuestionController');
const router = express.Router();

router.get('/',getAllQuestion)
router.post( '/' , createQuestion)
 
module.exports = router;