const dotenv = require("dotenv");
const path = require("path");
require("console.table");

dotenv.config({ path: path.join(__dirname, "config.env") });

// MySQL connection
const connection = require("./dev/db/db");

// Inquirer
const {
  mainQ,
  addDepartmentQ,
  addEmployeeQ,
  addRoleQ,
  getAnswer
} = require("./dev/inquirer");

const init = async () => {
  // Database connection
  // const connection = db();

  connection.query("SELECT * FROM department", (err, res) => {
    console.log(res);
    console.table(res);
  });

  connection.end();
  // const answers = await getAnswer(questions);
  // console.log(answers);
};

// refresh db, bring roles, employees, department

init();

// console.table([
//   {
//     name: "foo",
//     age: 10
//   },
//   {
//     name: "bar",
//     age: 20
//   }
// ]);

// const table = cTable.getTable([
//   {
//     name: "foo2",
//     age: 10
//   },
//   {
//     name: "bar2",
//     age: 20
//   }
// ]);
// console.log(table);
