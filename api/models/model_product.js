var db = require('./database'); //nhúng model database vào đế kết nối db
var dataList=[]; // biến để chứa dữ liệu đổ về cho controller
var dataName = [];

// định nghĩa các hàm để tương tác vào mysql

    // Danh sách tất cả sản phẩm:
exports.list_products = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT SP.masp, SP.code, SP.tensp, SP.soluong, SP.size, SP.mau, SP.gia, SP.hinh, 
        SP.hinhchitiet, SP.mota, SP.trangthai, nhasx.tennsx, loaisp.tenloai, danhmuc.tendm
        FROM (((sanpham AS SP JOIN danhmuc ON SP.madm = danhmuc.madm) JOIN loaisp ON SP.maloai = loaisp.maloai)
        JOIN nhasx ON SP.mansx = nhasx.mansx) WHERE SP.trangthai = 1`;
        db.query(sql, (err, result) => {
            console.log('List success');
            dataList = result;
            hamOK(dataList);
        })
    })
}
    // Check code:
exports.check_Code = async (code) => {
    let data = [];
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM sanpham WHERE code='${code}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                if(result.length < 0){
                    hamOK(-1);
                } else{
                    data = result;
                    hamOK(data);
                }
            }
        })
    })
};
    // Lọc sản phẩm theo ID:
exports.get_By_Id = async (productId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT SP.masp, SP.code, SP.tensp, SP.soluong, SP.size, SP.mau, SP.gia, SP.hinh, 
        SP.hinhchitiet, SP.mota, SP.trangthai, nhasx.tennsx, loaisp.tenloai, danhmuc.tendm
        FROM (((sanpham AS SP JOIN danhmuc ON SP.madm = danhmuc.madm) JOIN loaisp ON SP.maloai = loaisp.maloai)
        JOIN nhasx ON SP.mansx = nhasx.mansx) WHERE SP.masp='${productId}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                if(result[0] == null){
                    hamOK(-1);
                } else{
                    hamOK(result[0]);
                }
            }
        })
    })
};
    // Lọc danh sách sản phẩm theo danh mục:
exports.get_by_category = async (madm) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT SP.masp, SP.code, SP.tensp, SP.soluong, SP.size, SP.mau, SP.gia, SP.hinh, 
        SP.hinhchitiet, SP.mota, SP.trangthai, nhasx.tennsx, loaisp.tenloai, danhmuc.tendm
        FROM (((sanpham AS SP JOIN danhmuc ON SP.madm = danhmuc.madm) JOIN loaisp ON SP.maloai = loaisp.maloai)
        JOIN nhasx ON SP.mansx = nhasx.mansx) WHERE SP.madm='${madm}' AND SP.trangthai = 1`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                console.log('List success');
                hamOK(result);
            }
        })
    })
}
    // Lọc danh sách sản phẩm theo loại:
exports.get_by_type = async (maloai) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT SP.masp, SP.code, SP.tensp, SP.soluong, SP.size, SP.mau, SP.gia, SP.hinh, 
        SP.hinhchitiet, SP.mota, SP.trangthai, nhasx.tennsx, loaisp.tenloai, danhmuc.tendm
        FROM (((sanpham AS SP JOIN danhmuc ON SP.madm = danhmuc.madm) JOIN loaisp ON SP.maloai = loaisp.maloai)
        JOIN nhasx ON SP.mansx = nhasx.mansx) WHERE SP.maloai='${maloai}' AND SP.trangthai = 1`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                console.log('List success');
                hamOK(result);
            }
        })
    })
}
    // Lọc danh sách sản phẩm theo nhà sản xuất:
exports.get_by_producer = async (mansx) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT SP.masp, SP.code, SP.tensp, SP.soluong, SP.size, SP.mau, SP.gia, SP.hinh, 
        SP.hinhchitiet, SP.mota, SP.trangthai, nhasx.tennsx, loaisp.tenloai, danhmuc.tendm
        FROM (((sanpham AS SP JOIN danhmuc ON SP.madm = danhmuc.madm) JOIN loaisp ON SP.maloai = loaisp.maloai)
        JOIN nhasx ON SP.mansx = nhasx.mansx) WHERE SP.mansx='${mansx}' AND SP.trangthai = 1`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                console.log('List success');
                hamOK(result);
            }
        })
    })
}
    // Chi tiết sản phẩm theo tên:
exports.detailByName = async (name) => {
    return new Promise( (hamOK, hamLoi) => {
            let filterProduct;
            let sql = `SELECT * FROM sanpham`;
            let query = db.query(sql, (err, d) => {
                console.log('Detail success');
                dataName = d;
                for( i in dataName) {
                    let product = dataName[i];
                    //let newName = replaceNameProduct(product.tensp);
                    let newName = product.tensp;
                    if(newName == name) {
                        filterProduct = product;
                    }
                }
                hamOK(filterProduct);
            })
            
        }
    )
}
    // Thêm sản phẩm:
exports.create_product = (data) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = "INSERT INTO sanpham SET ?";
        let query = db.query(sql, data, (err, result) => {
            if(err)
                hamLoi(err);
            console.log('Create product success');
        });
        let sql_productId = "SELECT LAST_INSERT_ID() as LastID;";
        let query1 = db.query(sql_productId, (err, result1) => {
            console.log("ID sản phẩm vừa tạo: ", result1[0].LastID);
            if(err)
                hamLoi(err);
            else{
                let dataCTDM = {
                    masp: result1[0].LastID,
                    madm: data.madm,
                }
                let sql_CTDM = `INSERT INTO chitietdm SET ?`;
                let query2 = db.query(sql_CTDM, dataCTDM, (err, result) => {
                    if(err)
                        hamLoi(err);
                    else{
                        console.log('Create chi tiết danh mục success');
                        hamOK(1);
                    }
                });
            }
        });
    });
}
    // Sửa sản phẩm:
exports.update_product = (masp, code, tensp, soluong, size, mau, gia, hinh, hinhchitiet, mota) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE sanpham SET  
        code='${code}', 
        tensp='${tensp}', 
        soluong='${soluong}', 
        size='${size}', 
        mau='${mau}', 
        gia='${gia}', 
        hinh='${hinh}', 
        hinhchitiet='${hinhchitiet}',
        mota='${mota}' 
        WHERE masp='${masp}'`;
        let query = db.query(sql, (err, result) => {
            if(err){
                console.log("Lỗi!", err);
                hamLoi(err);
            }else{
                console.log('Update product success');
                hamOK(result);
            }
        });
    });
};
    // Khoá sản phẩm: (Ẩn sản phẩm )
exports.lock_product = (masp) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE sanpham SET trangthai = 0 WHERE masp = '${masp}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                console.log('Lock product success');
                hamOK(result);
            }
        })
    })
}
    // Mở khoá sản phẩm:
exports.unlock_product = (masp) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE sanpham SET trangthai = 1 WHERE masp = '${masp}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                console.log('Unlock product success');
                hamOK(result);
            }
        })
    })
}
    // Xoá sản phẩm:
exports.delete = (idProduct) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql_donhang = `SELECT * FROM chitietdh WHERE masp='${idProduct}'`;
        let query = db.query(sql_donhang, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                if(result.length > 0){
                    hamOK(-1);  // Có sản phẩm trong chi tiết đơn hàng nên ko thể xoá;
                }
            }
        });
        console.log("continue");
        let sql = `DELETE FROM chitietdm WHERE masp='${idProduct}'`;
        let query1 = db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
        });
        let sql_sp = `DELETE FROM sanpham WHERE masp='${idProduct}'`;
        let query2 = db.query(sql_sp, (err, result) => {
            if(err)
                hamLoi(err);
            else {
                console.log('Delete success');
                hamOK(result);
            }
        });
    });
}


exports.hotProduct = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM product WHERE views > 0 ORDER BY views DESC LIMIT 5";
        db.query(sql, (err, d) => {
            console.log('List success');
            dataList = d;
            hamOK(dataList);
        })
        }
    )
}

exports.newProduct = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM product ORDER BY dateUpdate DESC LIMIT 5";
        db.query(sql, (err, d) => {
            console.log('List success');
            dataList = d;
            hamOK(dataList);
        })
        }
    )
}

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "i");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
    str = str.replace(/Đ/g, "d");
    //str = str.split(' ').join('-');
    return str;
  }
  
  function replaceNameProduct(nameProduct) {
    var newNameProduct = xoa_dau(nameProduct);
    return newNameProduct;
  }