const express = require('express');
const {  getSingleGPUData, getRelatedGPU,getAllPerposeGpu } = require('../../Controller/GraphicsController');
const router = express.Router();
//-------------------All Get Requests---------------------------------
router.get('/related', getRelatedGPU);
router.get('/get', getAllPerposeGpu);
router.get('/detail/:id',getSingleGPUData)



module.exports = router;