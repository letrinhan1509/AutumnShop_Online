const express = require('express');
const router = express.Router();

const db = require('../models/database');
const modelDiscount = require('../models/model_discount');


            // API GET
    // Danh sách tất cả các khuyến mãi:
router.get('/', async function(req, res) { 
    try {
        let list = await modelDiscount.list_Discounts();
        res.status(200).json({ "status": "Success", "discount": list });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "error": error })
    }
});
    // Danh sách tất cả các voucher:
router.get('/voucher', async function(req, res) { 
    try {
        let list = await modelDiscount.list_Discounts();
        res.status(200).json({ "status": "Success", "voucher": list });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "error": error })
    }
});



module.exports = router;