const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tld@123',
  database: 'ti'
});

module.exports = connection;