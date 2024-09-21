const express = require('express');
const {SaveUser,GetUser} = require('../../Controller/UserController');

const router = express.Router();



router.post('/', SaveUser);
router.get('/',GetUser)


module.exports = router;