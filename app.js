const dotenv = require("dotenv");
const path = require("path");
require("console.table");
const { promisify } = require("util");

dotenv.config({ path: path.join(__dirname, "config.env") });

// Connect to DB
const createDB = require("./dev/db/db");

// const query = promisify(connection.query);
// Inquirer
const {
  mainQ,
  addDepartmentQ,
  addEmployeeQ,
  addRoleQ,
  getAnswer
} = require("./dev/inquirer");

const init = async () => {
  // connection.query("SELECT * FROM department", (err, res) => {
  //   // console.log(res);
  //   console.table("1st", res);
  // });

  // cycle
  // 1 refresh db
  // query(
  //   "SELECT title FROM role; SELECT first_name, last_name FROM employee; SELECT name FROM department"
  // ).then(async res => {
  //   // if (err) throw err;

  //   console.log(res);
  // });
  const db = createDB();
  const result = await db.query("SELECT title FROM role");

  // const result = await query.call(connection, "SELECT title FROM role");
  console.log(result);

  //   "SELECT title FROM role; SELECT first_name, last_name FROM employee; SELECT name FROM department",
  //   async (err, res) => {
  //     if (err) throw err;

  //     console.log(res);

  //     res[0].forEach(el => {
  //       addEmployeeQ[2].choices.push(el.title);
  //     });

  //     res[1].forEach(el => {
  //       addEmployeeQ[3].choices.push(`${el.first_name} ${el.last_name}`);
  //     });

  //     res[2].forEach(el => {
  //       addRoleQ[2].choices.push(el.name);
  //     });

  //     await getAnswer(addEmployeeQ);
  //   }
  // );
  // connection.query("SELECT title FROM role", (err, res) => {
  //   if (err) throw err;
  //   addEmployeeQ[2].choices = res;
  // });

  // connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
  //   if (err) throw err;
  //   addEmployeeQ[3].choices = res;
  // });
  // 2 inquier

  // await getAnswer(mainQ);
  // await getAnswer(addEmployeeQ);

  // connection.end();
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
