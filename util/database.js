const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "",
});
module.exports = pool.promise();

// const pool = mysql.createPool({
//   host: "database-2.cpslqr44gyke.us-east-1.rds.amazonaws.com",
//   user: "hiteshtest",
//   database: "node_complete",
//   password: "hiteshtest",
//   insecureAuth: true,
// });
