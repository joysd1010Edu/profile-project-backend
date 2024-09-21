const express = require('express');
const { getSingleMonitorData, GetAllPrepousMonitor } = require('../../Controller/MonitorController');
const router = express.Router();


router.get('/get',GetAllPrepousMonitor)
router.get('/detail/:id',getSingleMonitorData)


module.exports = router;