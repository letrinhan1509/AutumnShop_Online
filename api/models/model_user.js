var db = require('./database'); //nhúng model database vào đế kết nối db

var dataList = [];
var dataName = [];

exports.checkEmail = (email) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khachhang WHERE email = '${email}'`;
        db.query(sql, (err, d) => {
            if(err)
                hamLoi(err);
            else{
                dataList = d[0];
                hamOK(dataList);
            }
        })
    })
}
    //Danh sách khách hàng
exports.list = () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = 'SELECT makh, tenkh, email, sodienthoai, diachi, trangthai FROM khachhang'
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                console.log('List All Users Success!');
                hamOK(result);
            }
        });
    });
};
    // Lọc khách hàng theo tên:
exports.detailByName = (nameUser) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT tenkh, email, sodienthoai, diachi FROM khachhang WHERE tenkh LIKE '${nameUser}'`;
        db.query(sql, (err, result) => {
            console.log('User Success!');
            hamOK(result[0]);
        })
    });
}
    // Lọc khách hàng theo ID:
exports.getById = (userId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT makh, tenkh, email, sodienthoai, diachi, trangthai FROM khachhang WHERE makh='${userId}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                if(result[0] == null){
                    console.log('Fail! No user!');
                    hamOK(-1);
                }else{
                    console.log('User Success!');
                    hamOK(result[0]);
                }
            }
        })
    });
}
    // Thêm tài khoản user:
exports.insertUser = (data) => {
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO khachhang SET ?";
        db.query(sql, data, (err, result) => {
            if(err){
                console.log('Insert user fail')
                reject(err);
            } else{
                console.log('Insert user successfully');
                resolve(result);    // trả về kết quả nếu promise hoàn thành.
            }
        })
    })
}
    // Cập nhật profile khách hàng:
exports.updateProfileUser = (userId, name, pas, phone, address) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE khachhang SET tenkh = '${name}', matkhau = '${pas}', sodienthoai = '${phone}', diachi = '${address}' WHERE makh = '${userId}'`;
        db.query(sql, (err, result) => {
            console.log('Update success');
            hamOK(result);
        })
        }
    )
}
    // Cập nhật mật khẩu khách hàng:
exports.updatePasswordUser = (email, pass) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE khachhang SET matkhau = '${pass}' WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                console.log('Update success');
                hamOK(result);
            }
        })
        }
    )
}
    // Khoá tài khoản khách hàng:
exports.lockUser = (userId) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE khachhang SET trangthai = 0 WHERE makh = '${userId}'`;
        db.query(sql, (err, result) => {
            console.log('Lock user success');
            resolve(result);
        })
    })
}
    // Mở khoá tài khoản khách hàng:
exports.unlockUser = (userId) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE khachhang SET trangthai = 1 WHERE makh = '${userId}'`;
        db.query(sql, (err, result) => {
            console.log('Unlock user success');
            resolve(result);
        })
    })
}

///UserName
//Tất cả thành tài khoảng khách hàng
/* exports.listUserKH = () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM khachhang";
        db.query(sql, (err, d) => {
            console.log('List success');
            dataList = d;
            hamOK(dataListUser);
        })
        }
    )
} */