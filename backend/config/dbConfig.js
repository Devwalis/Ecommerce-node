const mysql = require('mysql2/promise');
const dotenv = require('dotenv')
dotenv.config();


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodeecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});

module.exxports = pool;
