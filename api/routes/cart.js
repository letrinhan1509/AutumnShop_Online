var express = require('express');
const axios = require('axios');
var router = express.Router();

const modelCart = require('../models/model_cart'); //nhúng model products vào controller này để sử dụng


            //  API GET:
    // Danh sách tất cả giỏ hàng:
router.get('/', async function(req, res) { 
    try {
        let query = await modelCart.list();
        console.log(query);
        if(query == 0)
            res.status(400).json({ "status": "Fail", "cart": "Danh sách giỏ hàng hiện đang trống!!!" });
        else
            res.status(200).json({ "status": "Success", "cart": query });
    } catch (error) {
        res.status(404).json({ "status": "Fail", "error": error });
    }
});
    // Giỏ hàng theo id khách hàng:
router.get('/khach-hang/:id', async function(req, res) { 
    try {
        let idKH = req.params.id;
        let query = await modelCart.get_By_userId(idKH);
        if(query == 0)
            res.status(400).json({ "status": "Fail", "cart": "Giỏ hàng của bạn hiện đang trống!!!" });
        else
            res.status(200).json({ "status": "Success", "cart": query });
    } catch (error) {
        res.status(404).json({ "status": "Fail", "error": error });
    }
});
    // Giỏ hàng theo id sản phẩm:
router.get('/san-pham/:id', async function(req, res) { 
    try {
        let id = req.params.id;
        let query = await modelCart.get_By_userId(id);
        if(query == 0)
            res.status(400).json({ "status": "Fail", "cart": "Giỏ hàng của bạn hiện đang trống!!!" });
        else
            res.status(200).json({ "status": "Success", "cart": query });
    } catch (error) {
        res.status(404).json({ "status": "Fail", "error": error });
    }
});


    // Thêm sản phẩm vào giỏ hàng:
router.put('/them-san-pham', async function(req, res) { 
    try {
        let makh = req.body.makh;
        let masp = req.body.masp;
        let hinh = req.body.hinh;
        let gia = req.body.gia;
        let giagiam = req.body.giagiam;
        let soluong = req.body.soluong;
        let thanhtien = req.body.thanhtien;

        let data = {
            makh: makh,
            masp: masp,
            hinh: hinh,
            gia: gia,
            giagiam: giagiam,
            soluong: soluong,
            thanhtien: thanhtien
        };
        //let query = await modelCart.put(data);
        res.status(200).json({ "status": "Success", "message": "Thêm sản phẩm vào trong giỏ hàng thành công!!!" });
    } catch (error) {
        res.status(404).json({ "status": "Fail", "message": "Thêm sản phẩm vào trong giỏ hàng không thành công!!!", "error": error });
    }
});
    // Cập nhật 1 sản phẩm trong giỏ hàng:
router.put('/cap-nhat-san-pham', async function(req, res) { 
    try {
        let magiohang = req.body.magiohang;
        let masp = req.body.masp;
        let hinh = req.body.hinh;
        let gia = req.body.gia;
        let giagiam = req.body.giagiam;
        let soluong = req.body.soluong;
        let thanhtien = req.body.thanhtien;

        let data = {
            magiohang: magiohang,
            masp: masp,
            hinh: hinh,
            gia: gia,
            giagiam: giagiam,
            soluong: soluong,
            thanhtien: thanhtien
        };
        let query = await modelCart.put(data);
        res.status(200).json({ "status": "Success", "message": "Cập nhật sản phẩm trong giỏ hàng thành công!!!" });
    } catch (error) {
        res.status(404).json({ "status": "Fail", "message": "Cập nhật sản phẩm trong giỏ hàng không thành công!!!", "error": error });
    }
});
    // Xoá 1 sản phẩm trong giỏ hàng thông qua id giỏ hàng:
router.delete('/xoa-san-pham/:id', async function(req, res) { 
    try {
        let id = req.params.id;
        let query = await modelCart.delete(id);
        res.status(200).json({ "status": "Success", "message": "Xoá sản phẩm trong giỏ hàng thành công!!!", "result": query });
    } catch (error) {
        res.status(404).json({ "status": "Fail", "message": "Xoá sản phẩm trong giỏ hàng không thành công!!!", "error": error });
    }
});


module.exports = router;