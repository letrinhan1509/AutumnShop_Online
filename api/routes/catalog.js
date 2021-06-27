var express = require('express');
var router = express.Router();
const modelCatalog = require('../models/model_catalog.js'); //nhúng model catalog vào controller này để sử dụng


      // API
  // Danh mục sản phẩm:
router.get('/', async function (req, res) {
  try {
    let listCategory = await modelCatalog.list_Categorys();
    res.status(200).json({ "status": "Success", "data": listCategory });
  } catch (error) {
    res.status(400).json({ "status": "Fail", "error": error })
  }
});
  // Danh sách loại sản phẩm:
router.get('/loai', async function (req, res) {
  try {
    let listPro = await modelCatalog.list_types();
    res.status(200).json({ "status": "Success", "data": listPro });
  } catch (error) {
    res.status(400).json({ "status": "Fail", "error": error })
  }
});
  // Danh mục theo mã danh mục:
router.get('/:id', async function (req, res) {
  try {
    let typeId = req.params.id;
    let type = await modelCatalog.get_Category_Id(typeId);
    if (type == -1) {
      res.status(400).json({ "status": "Fail", "message": "Không tìm thấy danh mục này trong DB!" });
    } else
      res.status(200).json({ "status": "Success", "data": type });
  } catch (error) {
    res.status(400).json({ "status": "Fail", "error": error });
  }
});
  // Chi tiết 1 loại theo mã loại:
router.get('/loai/:id', async function (req, res) {
  try {
    let typeId = req.params.id;
    let type = await modelCatalog.get_Type_Id(typeId);
    if (type == -1) {
      res.status(400).json({ "status": "Fail", "message": "Không tìm thấy loại sản phẩm này trong DB!" });
    } else
      res.status(200).json({ "status": "Success", "data": type });
  } catch (error) {
    res.status(400).json({ "status": "Fail", "message": "Lỗi cú pháp...! ", "error": error });
  }
});
  // Tất cả loại theo mã danh mục:
router.get('/:id/loai', async function (req, res) {
  try {
    let madm = req.params.id;
    let type = await modelCatalog.get_Type_Catalog(madm);
    if (type == -1) {
      res.status(400).json({ "status": "Fail", "message": "Không tìm thấy loại sản phẩm thuộc danh mục này!" });
    } else
      res.status(200).json({ "status": "Success", "data": type });
  } catch (error) {
    res.status(400).json({ "status": "Fail", "message": "Lỗi...! ", "error": error })
  }
}); 


      // API POST:
  // Thêm loại:
router.post('/them-loai', async function(req, res) {
  let typeId = req.body.maloai;
  let name = req.body.tenloai;
  let madm = req.body.madm;
  let data = {
    maloai: typeId,
    tenloai: name,
    madm: madm
  }

  try {
      let query = await modelCatalog.insert_Type(data);
      res.status(200).json({ "status": "Success", "message": "Thêm loại sản phẩm thành công!", "result": query });
  } catch (error) {
      res.status(400).json({ "status": "Fail", "message": "Lỗi cú pháp! Thêm loại sản phẩm không thành công!", "error": error });
  }
});
  // Cập nhật tên loại:
router.put('/cap-nhat-loai', async function(req, res) {
  let maloai = req.body.maloai;
  let ten = req.body.tenloai;
  let madm = req.body.madm;
  console.log(req.body);
  
  try {
      let query = await modelCatalog.update_Type(maloai, ten, madm);
      res.status(200).json({ "status": "Success", "message": "Cập nhật thông tin loại sản phẩm thành công!" });
  } catch (error) {
      res.status(400).json({ "status": "Fail", "message": "Lỗi cú pháp! Cập nhật thông tin loại sản phẩm không thành công!", "error": error });
  }
});
  // Xoá loại sản phẩm:
router.delete('/xoa-loai/:id', async function(req, res) {
  let typeId = req.params.id;

  try {
      let query = await modelCatalog.delete_Type(typeId);
      if(query == 1){
          res.status(200).json({"status": "Success", "message": "Xoá loại sản phẩm thành công!!!"});
      }else
          res.status(400).json({"status": "Fail", "message": "Có ràng buộc khoá ngoại. Không thể xoá loại!"});
  } catch (error) {
      res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Xoá loại không thành công!", "error": error});
  }
});


  // Thêm danh mục:
router.post('/them-danh-muc', async function(req, res) {
  let ma = req.body.madm;
  let ten = req.body.tendm;
  console.log(req.body);
  try {
    let data = {
      madm: ma,
      tendm: ten
    }
    let query = await modelCatalog.insert_category(data);
    res.status(200).json({"status": "Success", "message": "Thêm danh mục thành công!", "result": query});
  } catch (error) {
    res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Thêm danh mục không thành công!", "error": error});
  }
})
  // Cập nhật tên danh mục:
router.put('/cap-nhat-danh-muc', async function(req, res) {
  let categoryId = req.body.categoryId;
  let name = req.body.name;

  if(categoryId == '' || name == ''){
      res.status(400).json({"status": "Fail", "message": "Sai hoặc thiếu thông tin danh mục!"});
  }else{
    try {
      let query = await modelCatalog.update_category(categoryId, name);
      res.status(200).json({ "status": "Success", "message": "Cập nhật thông tin danh mục thành công!" });
    } catch (error) {
      res.status(400).json({ "status": "Fail", "message": "Lỗi cú pháp! Cập nhật thông tin danh mục không thành công!", "error": error });
    }
  }
});
  // Cập nhật trạng thái danh mục:
router.put('/cap-nhat-trang-thai/dmuc', async function(req, res) {
  let madm = req.body.madm;
  let trangthai = req.body.trangthai;
  console.log(req.body);
  try {
    if(madm != '' && trangthai == 1){
      let query = await modelCatalog.unlock_category(madm);
      res.status(200).json({ "status": "Success", "message": "Hiện danh mục thành công!" });
    } else if(madm != '' && trangthai == 0){
      console.log("ok");
      let query = await modelCatalog.lock_category(madm);
      res.status(200).json({ "status": "Success", "message": "Ẩn danh mục thành công!" });
    } else
      res.status(400).json({ "status": "Fail", "message": "Thiếu thông tin cập nhật trạng thái danh mục!!!" })
  } catch (error) {
    res.status(400).json({ "status": "Fail", "message": "Lỗi cú pháp! Cập nhật trạng thái danh mục không thành công!", "error": error })
  }
});



module.exports = router;