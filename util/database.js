const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "",
// });
<<<<<<< HEAD
=======
// module.exports = pool.promise();
>>>>>>> 6f9e68139595da76850fd6acd3c6473c07df9167

const pool = mysql.createPool({
  host: "database-2.cpslqr44gyke.us-east-1.rds.amazonaws.com",
  user: "hiteshtest",
  database: "node_complete",
  password: "hiteshtest",
  insecureAuth: true,
});
module.exports = pool.promise();
