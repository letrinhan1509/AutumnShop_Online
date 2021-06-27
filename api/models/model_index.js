const axios = require('axios');
var db = require('./database.js');
var data = [];
var dataNewArrivel = [];
var dataRecent = [];

exports.listCat = async () => {
    // let sql = "SELECT * FROM catalog";
    // let query = await db.query(sql, (err, result) => {
    //     console.log('List success');
    //     data = result;
    // })
    // return data;
    return new Promise( (hamOK, hamLoi) => {
            let sql = "SELECT * FROM catalog";
            db.query(sql, (err, d) => {
                console.log('List success');
                    data = d;
                    hamOK(data);
            })
        }
    )
}
exports.listNewArrival = async () => {
    // let sql = "SELECT * FROM product limit 7";
    // let query = await db.query(sql, (err, result) => {
    //     console.log('List success');
    //     dataNewArrivel = result;
    // })
    // return dataNewArrivel;
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM product limit 7";
        db.query(sql, (err, d) => {
            console.log('List success');
            dataNewArrivel = d;
                hamOK(dataNewArrivel);
        })
        }
    )
}
exports.listRecent = async () => {
    // let sql = "SELECT * FROM product ORDER BY dateUpdate DESC limit 6";
    // let query = await db.query(sql, (err, result) => {
    //     console.log('List success');
    //     dataRecent = result;
    // })
    // return dataRecent;
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM product ORDER BY dateUpdate DESC limit 6";
        db.query(sql, (err, d) => {
            console.log('List success');
            dataRecent = d;
                hamOK(dataRecent);
        })
        }
    )
}
exports.listCart = async (user) => {
    // let sql = "SELECT * FROM catalog";
    // let query = await db.query(sql, (err, result) => {
    //     console.log('List success');
    //     data = result;
    // })
    // return data;
    return new Promise( (hamOK, hamLoi) => {
            let sql = `SELECT * FROM cart WHERE user='${user}'`;
            db.query(sql, (err, d) => {
                console.log('List success');
                    data = d;
                    hamOK(data);
            })
        }
    )
}

exports.listCity = async () => {
    let data = [];
    console.log("đã vào listCity");
    var url = "https://thongtindoanhnghiep.co/api/city";
    axios.get(url)
        .then(function (response) {
            // handle success
            //console.log("data: ");
            //console.log(response.data.LtsItem);
            data = response.data.LtsItem;
            console.log(data);
            return data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return error;
        })
        .then(function () {
            // always executed
        });
}