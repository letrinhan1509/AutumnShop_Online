const e = require('express');
const db = require('./database'); //nhúng model database vào đế kết nối db

var itemCat=[]; // biến để chứa dữ liệu đổ về cho controller
var dataList=[];
var dataListPro=[];

    // Danh sách các nhà sản xuất:
exports.list_producer = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM nhasx";
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else
                hamOK(result);          
        })
    })
}
    // Get nhà sản xuất theo id:
exports.get_By_Id = async (producerId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM nhasx WHERE mansx='${producerId}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                if(result[0] == null)
                    hamOK(-1)   // Không có nhà sản xuất này trong DB.
                else
                    hamOK(result[0]);// Trả về nhà sản xuất tìm thấy trong DB.
            }            
        })
    })
}
    // Thêm nhà sản xuất:
exports.insert_producer = (data) => {
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO nhasx SET ?";
        db.query(sql, data, (err, result) => {
            if(err)
                reject(err);
            else{
                console.log('Insert producer successfully')
                resolve(result);    // trả về kết quả nếu promise hoàn thành.
            }
        })
    })
}
    // Cập nhật nhà sản xuất:
exports.update_producer = (producerId, name, origin) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE nhasx SET tennsx = '${name}', xuatxu = '${origin}' WHERE mansx = '${producerId}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                console.log('Update type success');
                hamOK(result);
            }
        })
    })
}
    // Xoá nhà sản xuất:
exports.delete_producer = (producerId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql_type = `SELECT sanpham.code, sanpham.tensp, nhasx.tennsx
        FROM sanpham JOIN nhasx
        ON sanpham.mansx = nhasx.mansx
        WHERE sanpham.mansx='${producerId}'`;
        db.query(sql_type, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                if(result[0] == null){
                    console.log("Xoá được!");
                    let sql = `DELETE FROM nhasx WHERE mansx='${producerId}'`;
                    db.query(sql, (err, result) => {
                        console.log('Delete type success');
                        hamOK(1);
                    })
                }else{
                    console.log("Không xoá được!");
                    hamOK(-1);
                }
            }
        })
    })  
}