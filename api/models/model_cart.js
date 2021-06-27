const express = require('express');
const db = require('./database');

// resolve: Hàm trả về kết quả đúng.
// reject: Hàm trả về nếu bị err.
var dataList = [];


exports.list = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM giohang`;
        db.query(sql, (err, result) => {
            if(err) {
                hamLoi(err);
            } else if(result.length <= 0){
                hamOK(0);
            } else{
                dataList = result;
                hamOK(dataList);
            }
        });
    });
};

exports.get_By_userId = async (userId) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM giohang WHERE makh = '${userId}'`;
        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            } else if(result.length <= 0){
                resolve(0);
            } else{
                dataList = result;
                resolve(dataList);
            }
        });
    });
};

exports.put = async (data) => {
    return new Promise( (resolve, reject) => {
        //let sql = `UPDATE giohang SET ? WHERE magiohang = '${data.magiohang}'`;
        db.query(sql, data, (err, result) => {
            if(err) {
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

exports.delete = async (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `DELETE FROM giohang WHERE magiohang = '${id}'`;
        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};