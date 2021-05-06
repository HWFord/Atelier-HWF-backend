const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'atelierhwf'
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to Mysql database");
})

module.exports = connection;