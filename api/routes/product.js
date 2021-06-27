var express = require('express');
var router = express.Router();
const modelProduct = require('../models/model_product'); //nhúng model products vào controller này để sử dụng
const modelComment = require('../models/model_comment');

var breadcrumb = 'Tất cả sản phẩm';

      // API GET:
  // Danh sách tất cả sản phẩm:
router.get('/', async function(req, res) { 
  try {
    let listPro = await modelProduct.list_products();
    res.json({ "status": "Success", "data": listPro });
  } catch (error) {
    res.json({ "status": "Fail", "error": error })
  }
})
router.get('/api/hot-product', async function(req, res) {
  let data = await modelProduct.hotProduct();
  res.json(data);
})
router.get('/api/new-product', async function(req, res) {
  let data = await modelProduct.newProduct();
  res.json(data);
})

  // Lọc sản phẩm theo id:
router.get('/:id', async function(req, res) {
  let idSpham = req.params.id;

  try {
    let sanPham = await modelProduct.get_By_Id(idSpham);
    let listCmt = await modelComment.get_by_productId(idSpham);
    if (sanPham == -1) {
      res.status(404).json({ "status": "Fail", "message": "Không tìm thấy sản phẩm này trong DB!" });
    } else
      res.status(200).json({ "status": "Success", "dataSpham": sanPham, "dataCmt": listCmt });
  } catch (error) {
    res.status(404).json({ "status": "Fail", "message": "Lỗi cú pháp!!!", "error": error });
  }
})
  // Lọc sản phẩm theo loại:
router.get('/loai/:id', async function(req, res) {
  let idLoai = req.params.id;
  try {
    let listPro = await modelProduct.get_by_type(idLoai);  
    if(listPro.length > 0){
      res.json({ "status": "Success", "data": listPro });
    }
    else
      res.json({ "status": "Fail", "message": "Không có sản phẩm nào thuộc loại này" });
  } catch (error) {
    res.json({ "status": "Fail", "error": error })
  }
})
  // lọc sản phẩm theo danh mục:
router.get('/danh-muc/:dmuc', async function(req, res) {
  let idDMuc = req.params.dmuc;
  try {
    let listPro = await modelProduct.get_by_category(idDMuc);
    if(listPro.length > 0){
      res.json({ "status": "Success", "data": listPro });
    }
    else
      res.json({ "status": "Fail", "message": "Không có sản phẩm nào thuộc danh mục này" });
  } catch (error) {
    res.json({ "status": "Fail", "error": error })
  }
})
  // Lọc sản phẩm theo nhà sản xuất:
router.get('/nha-san-xuat/:nhasx', async function(req, res) {
  let idNSX = req.params.nhasx;
  try {
    let listPro = await modelProduct.get_by_producer(idNSX);
    if(listPro.length > 0){
      res.json({ "status": "Success", "data": listPro });
    }
    else
      res.json({ "status": "Fail", "message": "Không có sản phẩm nào thuộc nhà sản xuất này" });
  } catch (error) {
    res.json({ "status": "Fail", "error": error })
  }
})


      // API POST:
  // Thêm sản phẩm:
router.post('/them-san-pham', async function(req, res) {
  let code = req.body.code;
  let tensp = req.body.ten;
  let soluong = req.body.soluong;
  let size = req.body.size;
  let mau = req.body.mau;
  let gia = req.body.gia;
  let hinh = req.body.img;
  let hinhchitiet = req.body.hinhchitiet;
  let mota = req.body.mota;
  let trangthai = req.body.trangthai;
  let mansx = req.body.mansx;
  let maloai = req.body.maloai;
  let madm = req.body.madm;
  let sanPham = await modelProduct.check_Code(code);
  let masp = maloai + mau + size
  console.log(sanPham.length);
  
  /* try {
    if(sanPham.length > 0){
      res.status(400).json({"status": "Fail", "message": "Mã code của sản phẩm đã tồn tại! Vui lòng nhập mã code khác!"});
    } else if(code == '' && tensp == '' && soluong == '' && size == '' && mau == '' && gia == '' && hinh == '' && maloai == '' && madm == ''){
      res.status(400).json({"status": "Fail", "message": "Thêm sản phẩm không thành công! Thiếu thông tin sản phẩm"});
    } else{
      let data = {
        code: code,
        tensp: tensp,
        soluong: soluong,
        size: size,
        mau: mau,
        gia: gia,
        hinh: hinh,
        hinhchitiet: hinhchitiet,
        mota: mota,
        mansx: mansx,
        maloai: maloai,
        madm: madm,
      };
      let query = await modelProduct.create_product(data);
      if(query == 1)
        res.status(200).json({ "status": "Success", "message": "Thêm sản phẩm thành công!", "result": query });
      else
      res.status(400).json({ "status": "Fail", "message": "Thêm sản phẩm không thành công!" });
    }
  } catch (error) {
    res.status(400).json({ "status": "Fail", "message": "Lỗi cú pháp! Thêm sản phẩm không thành công!", "error": error });
  } */
});
  // Sửa sản phẩm:
router.put('/cap-nhat-san-pham', async function(req, res) {
  let masp = req.body.masp;
  let code = req.body.code;
  let tensp = req.body.ten;
  let soluong = req.body.soluong;
  let size = req.body.size;
  let mau = req.body.mau;
  let gia = req.body.gia;
  let hinh = req.body.hinh;
  let hinhchitiet = req.body.hinhchitiet;
  let mota = req.body.mota;
  if(masp == '' && code == '' && tensp == '' && soluong == '' && size == '' && mau == '' && gia == '' && hinh == ''){
    res.status(400).json({"status": "Fail", "message": "Cập nhật sản phẩm không thành công! Thiếu thông tin sản phẩm"});
  }else{
    try {
        let query = await modelProduct.update_product(masp, code, tensp, soluong, size, mau, gia, hinh, hinhchitiet, mota);
        res.status(200).json({"status": "Success", "message": "Cập nhật sản phẩm thành công!", "result": query});
    } catch (error) {
        res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Cập nhật sản phẩm không thành công!", "error": error});
    }
  }
});
  // Cập nhật trạng thái sản phẩm:
router.put('/cap-nhat-trang-thai', async function(req, res) {
  let masp = req.body.masp;
  let trangthai = req.body.trangthai;

  if(masp == '' || trangthai == ''){
    res.status(400).json({"status": "Fail", "message": "Cập nhật trạng thái sản phẩm không thành công! Thiếu thông tin sản phẩm"});
  }else{
    try {
      if(trangthai == 1){
        let query = await modelProduct.unlock_product(masp);
        res.status(200).json({"status": "Success", "message": "Hiện sản phẩm thành công!", "result": query});
      }else{
        let query = await modelProduct.lock_product(masp);
        res.status(200).json({"status": "Success", "message": "Ẩn sản phẩm thành công!", "result": query});
      }
    } catch (error) {
        res.status(400).json({"status": "Fail", "message": "Lỗi cú pháp! Cập nhật sản phẩm không thành công!", "error": error});
    }
  }
});
  // Xoá sản phẩm:
router.delete('/xoa/:id', async function(req, res) {
  let masp = req.params.id;

  try {
    let query = await modelProduct.delete(masp);
    if(query == -1)
      res.status(400).json({ "status": "Fail", "message": "Sản phẩm có trong chi tiết đơn hàng! Không thể xoá sản phẩm" });
    else
      res.status(200).json({ "status": "Success", "message": "Xoá sản phẩm thành công!", "result": query });
  } catch (error) {
    res.status(400).json({ "status": "Fail", "message": "Lỗi cú pháp - có khoá ngoại! Xoá sản phẩm không thành công!", "error": error });
  }
});



router.get('/api/comment/:id', async function(req, res) {
  let idProduct = req.params.id;
  let data = await modelProduct.getComment(idProduct);
  res.json(data);
})
router.post('/comment/createcomment', async function(req, res) {
  let rating = req.body.star;
  let ten = req.body.ten;
  let email = req.body.email;
  let content = req.body.content;
  let idProduct = req.body.idProduct;
  let date = new Date;

  let data = {
    ten: ten,
    email: email,
    content: content,
    idProduct: idProduct,
    rating: rating,
    date: date
  }

  console.log(data);
  let query = await modelProduct.createComment(data);
  let nameProduct = req.body.nameProduct
  newName = replaceNameProduct(nameProduct).toLowerCase();
  res.redirect(`/san-pham/${newName}`)
})

function xoa_dau(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.split(' ').join('-');
  return str;
}

function replaceNameProduct(nameProduct) {
  var newNameProduct = xoa_dau(nameProduct);
  return newNameProduct;
}

module.exports = router;