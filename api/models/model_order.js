const { json } = require('body-parser');
var db = require('./database'); //nhúng model database vào đế kết nối db

var dataList=[]; // biến để chứa dữ liệu đổ về cho controller
var dataName = [];


    // Danh sách tất cả đơn hàng:
exports.list_Orders = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT DH.madonhang, DH.makh, khachhang.tenkh, DH.tongtien, khuyenmai.tenkm, DH.ngaydat, DH.ngaygiao,
        DH.trangthai, DH.manv FROM ((donhang AS DH JOIN khachhang ON DH.makh = khachhang.makh)
        JOIN khuyenmai ON DH.makm = khuyenmai.makm)`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                dataList = result;
                hamOK(dataList);
            }
        })
    })
}
    // Đơn hàng theo mã đơn hàng:
exports.get_By_Id = async (orderId) => {
    const data = [];
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT DH.madonhang, DH.makh, khachhang.tenkh, DH.tongtien, khuyenmai.tenkm, DH.ngaydat, DH.ngaygiao,
        DH.trangthai, DH.manv FROM ((donhang AS DH JOIN khachhang ON DH.makh = khachhang.makh)
        JOIN khuyenmai ON DH.makm = khuyenmai.makm) WHERE DH.madonhang = '${orderId}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                if(result.length > 0){
                    let sql = `SELECT CTDH.mact, sanpham.tensp, sanpham.gia, CTDH.giagiam, CTDH.soluong, CTDH.thanhtien,
                    khuyenmai.tenkm, CTDH.madonhang FROM ((chitietdh AS CTDH JOIN sanpham ON CTDH.masp = sanpham.masp)
                    JOIN khuyenmai ON CTDH.makm = khuyenmai.makm) WHERE CTDH.madonhang = '${orderId}'`;
                    db.query(sql, (err, result1) => {
                        if(err){
                            hamLoi(err);
                        } else {
                            result.chitietDH = result1;
                            data.push(result);
                            hamOK(data);
                        }
                    })
                }else{
                    hamOK(-1);
                }
            }
        })
    })
}
    // Đơn hàng theo mã khách hàng:
exports.get_By_userId = async (userId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT DH.madonhang, DH.makh, khachhang.tenkh, DH.tongtien, khuyenmai.tenkm, DH.ngaydat, DH.ngaygiao,
        DH.trangthai, DH.manv FROM ((donhang AS DH JOIN khachhang ON DH.makh = khachhang.makh)
        JOIN khuyenmai ON DH.makm = khuyenmai.makm) WHERE DH.makh = '${userId}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            } else {
                if(result.length > 0){
                    dataList = result;
                    hamOK(dataList);
                } else
                    hamOK(-1);
            }
        })
    })
}
    // Danh sách chi tiết đơn hàng:
exports.get_detailOrder = async (orderId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT CTDH.mact, sanpham.tensp, sanpham.gia, CTDH.giagiam, CTDH.soluong, CTDH.thanhtien,
        khuyenmai.tenkm, CTDH.madonhang FROM ((chitietdh AS CTDH JOIN sanpham ON CTDH.masp = sanpham.masp)
        JOIN khuyenmai ON CTDH.makm = khuyenmai.makm) WHERE CTDH.madonhang = '${orderId}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                dataList = result;
                hamOK(dataList);
            }
        })
    })
}
    // Cập nhật đơn hàng:
exports.update_Order = (orderId, delivery, status) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE donhang SET ngaygiao='${delivery}', trangthai='${status}' WHERE madonhang='${orderId}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else
                hamOK(result);
        })
    })
}
    // Tạo đơn hàng: (data là 1 mảng các sản phẩm)
exports.insert_Order = (userId, total, promoCode, orderDate, data) => {
    return new Promise( (hamOK, hamLoi) => {
        arrProduct = [];
        let sql = `INSERT INTO donhang(makh, tongtien, makm, ngaydat) VALUES ('${userId}', '${total}', '${promoCode}', '${orderDate}')`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
        })
        let sql_orderId = "SELECT LAST_INSERT_ID() as LastID;"; // Kết quả trả về là id đơn hàng vừa tạo.
        db.query(sql_orderId, (err, resultId) => {    // result sẽ trả về id đơn hàng vừa tạo.
            console.log(resultId);
            let sql_orderDetail = `INSERT INTO chitietdh SET ?`;
            if(err)
                hamLoi(err);
            else{
                /* arrProduct.forEach(element => {
                    
                }); */
                db.query(sql_orderDetail, data, (err, result1) => {    // Câu lệnh tạo chi tiết đơn hàng.
                    if(err)
                        hamLoi(err);
                })
            }
        })
    })
}