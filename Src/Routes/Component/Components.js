const express = require('express');
const {getSingleProducts,getAllProducts,
    getMotherboard,
    getHDD,
    getSSD,
    getRam,
    getPSU,
    getGraphicsCard,
    getCasing,
    getCasingCooler,
    getCPUCooler,
    getProcessors, getRamByBrand,
    Router, 
    getFeaturedProducts} = require('../../Controller/AllComponentController');
const router = express.Router();



router.get('/detail/:id', getSingleProducts);
router.get('/feature', getFeaturedProducts);
router.get('/ram', getRam);
router.get('/:component', Router);
router.get('/ram/:brand',getRamByBrand)
router.get('/', getAllProducts);
router.get('/', getAllProducts);
router.get('/', getAllProducts);



//65a0c7b1fde290429c941c2f
//65a0c7b1fde290429c941c2f
module.exports = router;
