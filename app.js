const dotenv = require("dotenv");
const path = require("path");
require("console.table");

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
  // cycle
  // 1 refresh db

  const db = createDB();
  const roles = await db.query("SELECT title FROM role");
  const managers = await db.query("SELECT first_name, last_name FROM employee");

  roles.forEach(el => {
    addEmployeeQ[2].choices.push(el.title);
  });

  managers.forEach(el => {
    addEmployeeQ[3].choices.push(`${el.first_name} ${el.last_name}`);
  });

  const add = await getAnswer(addEmployeeQ);
  console.log(add);

  // console.log(result);

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

  db.end();
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
