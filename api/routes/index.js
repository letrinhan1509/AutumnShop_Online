var express = require('express');
const axios = require('axios');
var router = express.Router();

const modelIndex = require('../models/model_index'); //nhúng model products vào controller này để sử dụng


router.get('/dang-nhap', (req, res, next) => { 
    res.status(200).render('dang-nhap');
});


            // API GET:
    // Danh sách tất cả thành phố:
router.get('/city', async function(req, res) { 
    try {
        var url = "https://thongtindoanhnghiep.co/api/city";
        axios.get(url)
            .then(function (response) {
                // handle success
                res.status(200).json({ "status": "Success", "city": response.data.LtsItem });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                res.status(400).json({ "status": "Fail", "message": "Lỗi! Không thể lấy danh sách thành phố!", "error": error });
            });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi! Không thể lấy danh sách thành phố!", "error": error });
    }
});
    // Chi tiết 1 Tỉnh/Thành phố:
router.get('/city/:id', async function(req, res) { 
    try {
        let id = req.params.id;
        var url = "https://thongtindoanhnghiep.co/api/city/" + id;
        axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data.Title);
                res.status(200).json({ "status": "Success", "city": response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                res.status(400).json({ "status": "Fail", "message": "Lỗi!!!", "error": error });
            });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi!!!", "error": error });
    }
});
    // Danh sách toàn bộ Quận/Huyện theo Tỉnh/Thành phố:
router.get('/city/:id/district', async function(req, res) { 
    try {
        let id = req.params.id;
        var url = "https://thongtindoanhnghiep.co/api/city/" + id + "/district";
        axios.get(url)
            .then(function (response) {
                // handle success
                res.status(200).json({ "status": "Success", "district": response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                res.status(400).json({ "status": "Fail", "error": error });
            });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "error": error });
    }
});
    // Chi tiết 1 Quận/Huyện:
router.get('/district/:id', async function(req, res) { 
    try {
        let id = req.params.id;
        var url = "https://thongtindoanhnghiep.co/api/district/" + id;
        axios.get(url)
            .then(function (response) {
                // handle success
                res.status(200).json({ "status": "Success", "district": response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                res.status(404).json({ "status": "Fail", "error": error });
            });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "error": error });
    }
});
    // Danh sách toàn bộ Phường/Xã thuộc Quận/Huyện:
router.get('/district/:id/ward', async function(req, res) { 
    try {
        let id = req.params.id;
        var url = "https://thongtindoanhnghiep.co/api/district/" + id + "/ward";
        axios.get(url)
            .then(function (response) {
                // handle success
                res.status(200).json({ "status": "Success", "ward": response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                res.status(400).json({ "status": "Fail", "error": error });
            });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "error": error });
    }
});
    // Chi tiết 1 phường, xã, thị trấn:
router.get('/ward/:id', async function(req, res) { 
    try {
        let id = req.params.id;
        var url = "https://thongtindoanhnghiep.co/api/ward/" + id;
        axios.get(url)
            .then(function (response) {
                // handle success
                res.status(200).json({ "status": "Success", "ward": response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                res.status(400).json({ "status": "Fail", "error": error });
            });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "error": error });
    }
});


module.exports = router;