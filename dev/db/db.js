const mysql = require("mysql");
const { promisify } = require("util");

function createDB() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
  });

  connection.connect(err => {
    if (err) {
      console.err("err connecting: ", +err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  return {
    query(qry, args) {
      return promisify(connection.query).call(connection, qry, args);
    },
    close() {
      return promisify(connection.close).call(connection);
    }
  };
}

module.exports = createDB;

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   multipleStatements: true
// });

// module.exports = (() => {
//   connection.connect(err => {
//     if (err) {
//       console.error("error connecting: " + err.stack);
//       return;
//     }

//     console.log("connected as id " + connection.threadId);
//   });

//   return connection;
// })();
