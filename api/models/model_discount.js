const db = require('./database'); //nhúng model database vào đế kết nối db

var dataList=[]; // biến để chứa dữ liệu đổ về cho controller

    // Danh sách tất cả khuyến mãi:
exports.list_Discounts = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khuyenmai`;
        let query = db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                dataList = result;
                console.log(dataList);
                hamOK(dataList);
            }
        })
        console.log("KQ:", query);
    })
}
    // Danh sách các voucher:
exports.list_Vouchers = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khuyenmai WHERE voucher = 1`;
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
    // Danh sách các khuyến mãi theo sản phẩm:
exports.list_Dis_Product = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khuyenmai WHERE voucher = 0`;
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
    // Danh sách sản phẩm khuyến mãi theo id:
exports.get_by_discountId = async (discountId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM ((chitietkm JOIN sanpham ON chitietkm.masp = sanpham.masp) 
        JOIN khuyenmai ON chitietkm.makm = khuyenmai.makm) WHERE chitietkm.makm = '${discountId}'`;
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
    // Tìm voucher theo tên:
exports.get_by_voucherName = async (name) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khuyenmai WHERE voucher = 0 AND khuyenmai.tenkm = '${name}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else if(result[0] == null)
            {
                hamOK("Không tìm thấy voucher này!!!");
            }else{
                console.log("Có voucher");
                hamOK(result[0]);
            }
        })
    })
}
    // Tạo voucher:
exports.create_Voucher = (data) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO khuyenmai SET ?";
        db.query(sql, data, (err, d) => {
            console.log('Insert successfully')
            resolve(d);
        })
    })
}
    // Tạo khuyến mãi:
exports.create_Discount = (data, masp, chietkhau, giakm) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO khuyenmai SET ?";
        db.query(sql, data, (err, d) => {
            console.log('Insert successfully')
        })
        let sql_discountId = "SELECT LAST_INSERT_ID() as LastID;";
        db.query(sql_discountId, (err, result1) => {
            console.log(result1[0]);
            let dataCTKM = {
                makm: result1[0],
                masp: masp,
                chietkhau: chietkhau,
                giakm: giakm
            }
            let sql_CTKM = `INSERT INTO chitietkm SET ?`;
            db.query(sql_CTKM, dataCTKM, (err, result) => {
                console.log(result);
                console.log('Create CTKM success');
            });
        });
    })
}
    // Sửa thông tin khuyến mãi:
exports.update_Discount = (id, ten, dk, voucher, ngaykt, trangthai) => {
    let sql = `UPDATE trangthai SET tenkm='${ten}', dieukien='${dk}', voucher='${voucher}', ngaykt='${ngaykt}', trangthai='${trangthai}'
    WHERE makm = '${id}'`;
    db.query(sql, (err, result) => {
        if(err)
            return err;
        else
            return result;
    })
}
    // Khoá khuyến mãi:
exports.lock_Discount = (id) => {
    let sql = `UPDATE khuyenmai SET trangthai = 0 WHERE makm = '${id}'`;
    db.query(sql, (err, result) => {
        console.log('Lock product success');
    })
}
    // Mở khoá sản phẩm:
exports.unlock_Discount = (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE khuyenmai SET trangthai = 1 WHERE makm = '${id}'`;
        db.query(sql, (err, result) => {
            if(err)
                reject(err);
            else{
                console.log('Unlock product success');
                resolve(result);
            }
        })
    });
};
    // Xoá khuyến mãi:
exports.delete = (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `DELETE FROM khuyenmai WHERE makm='${id}'`;
        let query = db.query(sql, (err, result) => {
            if(err)
                reject(err);
            else
                resolve(result);
        })
    });
};
