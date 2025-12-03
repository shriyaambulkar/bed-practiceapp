const mysql = require('mysql2');

const setting = {
    connectionLimit : 10, //set limit to 10 connection
    host     : 'localhost',
    port: 3307,
    user     : 'root',
    password : '',
    database : 'library',
    multipleStatements: true, //allow multiple sql statements
    dateStrings: true //return date as string instead of Date object
}

const pool = mysql.createPool(setting);

module.exports = pool;