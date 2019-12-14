const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'baobin123',
  database: 'mydb_auction',
  multipleStatements:true
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
  loadusername:(username)=>mysql_query(`select * from users where username= ? `,username),
  load: sql => mysql_query(sql),
  add: (tableName, entity) => mysql_query(`insert into ${tableName} set ?`, entity),
};
