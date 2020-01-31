const mysql = require("mysql");
const cTable = require("console.table");

console.table([
  {
    name: "foo",
    age: 10
  },
  {
    name: "bar",
    age: 20
  }
]);

const table = cTable.getTable([
  {
    name: "foo2",
    age: 10
  },
  {
    name: "bar2",
    age: 20
  }
]);
console.log(table);

const connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "test1234",
  database: "hr_tracker"
});

connection.connect(err => {
  if (err) throw err;

  console.log("connected...");
});
