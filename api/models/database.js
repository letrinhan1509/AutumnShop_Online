const { json } = require('body-parser');
var mysql = require('mysql');

    // Local:
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'autumn_shop'
})

    // Google Cloud Platform:
/* var db = mysql.createConnection({
    host: '34.121.93.32',
    user: 'trinhan',
    password: '123456',
    database: 'autumn_shop'
}) */

db.connect(function (err) {  
    if (err){
        console.log(err);
        console.log('Database is connected fail! Please check the connection again!');
    } else
        console.log('Database is connected successfully!');
});

module.exports = db;