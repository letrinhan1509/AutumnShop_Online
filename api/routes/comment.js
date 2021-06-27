const express = require('express');
const router = express.Router();

const db = require('../models/database');
const modelUser = require('../models/model_user');
const modelComment = require('../models/model_comment');


            // API GET
    // Danh sách bình luận:
router.get('/', async function(req, res) { 
    try {
        let listCmt = await modelComment.list_Comments();
        res.status(200).json({ "status": "Success", "data": listCmt });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "error": error })
    }
});
    // Bình luận theo id:
router.get('/:id', async function(req, res) { 
    let idCmt = req.params.id;

    try {
        let listCmt = await modelComment.get_by_Id(idCmt);
        if(listCmt == -1)
            res.status(400).json({ "status": "Fail", "message": "Không có bình luận nào!"});
        else
            res.status(200).json({ "status": "Success", "dataCmt": listCmt });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...Không thể lấy bình luận!","error": error })
    }
});
    // Bình luận theo mã khách hàng:
router.get('/khach-hang/:id', async function(req, res) { 
    let idUser = req.params.id;

    try {
        let listCmt = await modelComment.get_by_userId(idUser);
        if(listCmt == -1)
            res.status(400).json({ "status": "Fail", "message": "Không có bình luận nào!"});
        else
            res.status(200).json({ "status": "Success", "data": listCmt });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...Không thể lấy danh sách bình luận!","error": error })
    }
});
    // Bình luận theo mã sản phẩm:
router.get('/san-pham/:idPro', async function(req, res) { 
    let idSpham = await req.params.idPro;
    try {
        let listCmt = await modelComment.get_by_productId(idSpham);
        if(listCmt == -1)
            res.status(400).json({ "status": "Fail", "message": "Sản phẩm này không có bình luận nào!"});
        else
            res.status(200).json({ "status": "Success", "data": listCmt });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...Không thể lấy danh sách bình luận!", "error": error })
    }
});
    // Danh sách chi tiết bình luận theo mã bình luận:
router.get('/:id/chi-tiet-bluan', async function(req, res) { 
    let idCmt = req.params.id;
    try {
        let listCmt = await modelComment.get_detailComment(idCmt);
        if(listCmt == -1)
            res.status(400).json({ "status": "Fail", "message": "Không có chi tiết bình luận nào! Hoặc bình luận đó đã bị khoá"});
        else
            res.status(200).json({ "status": "Success", "data": listCmt });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...Không thể lấy danh sách bình luận!", "error": error })
    }
});


            // API POST
    // Tạo bình luận:
router.post('/them-binh-luan', async function(req, res) {
    let masp = req.body.masp;
    let makh = req.body.makh;
    let noidung = req.body.noidung;
    var today = new Date();
    var ngaybl = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(ngaybl);
  
    if(masp == '' && makh == '' && noidung == ''){
      res.status(400).json({"status": "Fail", "message": "Thêm bình luận không thành công! Thiếu thông tin!"});
    }else{
        let data = {
            masp: masp,
            makh: makh,
            noidung: noidung,
            ngaybl: ngaybl,
        };
        try {
            let query = await modelComment.create_Comment(data);
            res.status(200).json({"status": "Success", "message": "Thêm bình luận thành công!", "result": query});
        } catch (error) {
            res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Thêm bình luận không thành công!", "error": error});
        }
    }
});
    // Rep Cmt:
router.post('/tra-loi-binh-luan', async function(req, res) {
    let makh = req.body.makh;
    let noidung = req.body.noidung;
    let mabl = req.body.mabl;
    let manv = req.body.manv;
    var today = new Date();
    var ngaybl = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(ngaybl);
    let khachHang = await modelUser.getById(makh);
    console.log(khachHang.tenkh);

    if(mabl == '' && noidung == ''){
      res.status(400).json({ "status": "Fail", "message": "Trả lời bình luận không thành công! Thiếu thông tin!" });
    }else{
        let data = {
            makh: makh,
            tenkh: khachHang.tenkh,
            noidung: noidung,
            ngaybl: ngaybl,
            manv: manv,
            mabl: mabl
        };
        try {
            let query = await modelComment.create_RepComment(data);
            res.status(200).json({"status": "Success", "message": "Trả lời bình luận thành công!", "result": query});
        } catch (error) {
            res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Trả lời bình luận không thành công!", "error": error});
        }
    }
});
    // Chỉnh sửa bình luận:
router.put('/cap-nhat-binh-luan', async function(req, res) {
    let mabl = req.body.mabl;
    let noidung = req.body.noidung;
    
    if(noidung == ''){
      res.status(400).json({"status": "Fail", "message": "Chỉnh sửa bình luận không thành công!"});
    }else{
        try {
            let query = await modelComment.update_Comment(mabl, noidung);
            res.status(200).json({"status": "Success", "message": "Chỉnh sửa bình luận thành công!", "result": query});
        } catch (error) {
            res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Chỉnh sửa bình luận không thành công!", "error": error});
        }
    }
});
    // Chỉnh sửa chi tiết bình luận:
router.put('/cap-nhat-tra-loi-bluan', async function(req, res) {
    let mact = req.body.mact;
    let noidung = req.body.noidung;
    
    if(noidung == ''){
      res.status(400).json({"status": "Fail", "message": "Chỉnh sửa bình luận không thành công!"});
    }else{
        try {
            let query = await modelComment.update_RepComment(mact, noidung);
            res.status(200).json({"status": "Success", "message": "Chỉnh sửa bình luận thành công!", "result": query});
        } catch (error) {
            res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Chỉnh sửa bình luận không thành công!", "error": error});
        }
    }
});
    // Xoá bình luận:
router.delete('/xoa-binh-luan/:id', async function(req, res) {
    let mabl = req.params.id;

    try {
        let query = await modelComment.delete_Comment(mabl);
        res.status(200).json({"status": "Success", "message": "Xoá bình luận thành công!", "result": query});
    } catch (error) {
        res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Xoá bình luận không thành công!", "error": error});
    }
});
    // Xoá chi tiết bình luận:
router.delete('/xoa-tra-loi-bluan/:id', async function(req, res) {
    let mact = req.params.id;
    
    try {
        let query = await modelComment.delete_RepComment(mact);
        res.status(200).json({"status": "Success", "message": "Xoá bình luận thành công!", "result": query});
    } catch (error) {
        res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Xoá bình luận không thành công!", "error": error});
    }
});
    // Cập nhật trạng thái bình luận:  
router.put('/cap-nhat-trang-thai', async function(req, res) {
    let mabl = req.body.mabl;
    let trangthai = req.body.trangthai;
    console.log(req.body);
    if(mabl == '' && trangthai == '' ){
      res.status(400).json({ "status": "Fail", "message": "Lỗi...! Thiếu thông tin để cập nhật trạng thái bình luận!" });
    }else{
        try {
            if(trangthai == 0){
                console.log();
                let query = await modelComment.lock_Comment(mabl);
                res.status(200).json({ "status": "Success", "message": "Ẩn bình luận thành công!", "result": query });
            } else if(trangthai == 1){
                let query = await modelComment.unlock_Comment(mabl);
                res.status(200).json({ "status": "Success", "message": "Hiện bình luận thành công!", "result": query });
            } else
                res.status(400).json({ "status": "Fail", "message": "Lỗi...! Cập nhật trạng thái bình luận không thành công!" });
        } catch (error) {
            res.status(400).json({ "status": "Fail", "message": "Lỗi cú pháp! Cập nhật trạng thái bình luận không thành công!", "error": error });
        }
    }
});


module.exports = router;