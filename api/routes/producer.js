var express = require('express');
var router = express.Router();

const modelProducer = require('../models/model_producer');


            // API GET:
    // Danh sách tất cả nhà sản xuất:
router.get('/', async function (req, res) {
    try {
      let listProducer = await modelProducer.list_producer();
      res.status(200).json({ "status": "Success", "data": listProducer });
    } catch (error) {
      res.status(400).json({ "status": "Fail", "error": error })
    }
  });
    // Nhà sản xuất theo id:
router.get('/:id', async function (req, res) {
    try {
        let producerId = req.params.id;
        let producer = await modelProducer.get_By_Id(producerId);
        console.log(producer.mansx);
        if(producer == -1){
            res.status(400).json({ "status": "Fail", "message": "Không tìm thấy nhà sản xuất này trong DB!" });
        }else
            res.status(200).json({ "status": "Success", "data": producer });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "error": error });
    }
});


            // API POST:
    // Thêm nhà sản xuất:
router.post('/them-nha-sx', async function(req, res) {
    let producerId = req.body.mansx;
    let name = req.body.tennsx;
    let origin = req.body.xuatxu;
    
    let data = {
        mansx: producerId,
        tennsx: name,
        xuatxu: origin
    }
    try {
        let query = await modelProducer.insert_producer(data);
        res.status(200).json({ "status": "Success", "message": "Thêm nhà sản xuất thành công!" });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi cú pháp! Thêm nhà sản xuất không thành công!", "error": error });
    }
});
    // Cập nhật thông tin nhà sản xuất:
router.put('/cap-nhat-nha-sx', async function(req, res) {
    let producerId = req.body.mansx;
    let name = req.body.tennsx;
    let origin = req.body.xuatxu;

    if(producerId == '' || name == ''){
        res.status(400).json({"status": "Fail", "message": "Thiếu thông tin nhà sản xuất!"});
    }else{
        try {
            let query = await modelProducer.update_producer(producerId, name, origin);
            res.status(200).json({"status": "Success", "message": "Cập nhật nhà sản xuất thành công!"});
        } catch (error) {
            res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Cập nhật nhà sản xuất không thành công!", "error": error});
        }
    }
});
    // Xoá nhà sản xuất:
router.delete('/xoa-nha-sx/:id', async function(req, res) {
    let producerId = req.params.id;

    try {
        let query = await modelProducer.delete_producer(producerId);
        if(query == 1){
            res.status(200).json({"status": "Success", "message": "Xoá nhà sản xuất thành công!"});
        }else
            res.status(400).json({"status": "Fail", "message": "Có ràng buộc khoá ngoại. Không thể xoá nhà sản xuất!"});
    } catch (error) {
        res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Xoá nhà sản xuất không thành công!", "error": error});
    }
});



module.exports = router;