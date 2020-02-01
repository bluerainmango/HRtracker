const dotenv = require("dotenv");
const path = require("path");
require("console.table");

// Connect to DB
const createDB = require("./dev/db/db");

// Bring queries
const query = require("./dev/db/query");

dotenv.config({ path: path.join(__dirname, "config.env") });

// Inquirer
const { refreshChoices, getAnswer } = require("./dev/inquirer");

//* FUNCTION : Get query and print it in table
const showTable = async (db, query) => {
  const result = await db.getQuery(query);
  console.table(result);
  db.end();
};

//* FUCTION : init
const init = async () => {
  // cycle
  // 1 refresh db

  await refreshChoices();
  const answerTo = await getAnswer("main");

  const db = createDB();

  switch (answerTo.mainQuestion) {
    case "View all employees":
      showTable(db, query.getAllEmployees);

      break;
    case "View all departments":
      break;
  }
  // const addEmployeeAnswers = await getAnswer(addEmployeeQ);
  // const addRoleAnswers = await getAnswer(addRoleQ);
  // const updateRoleAnswers = await getAnswer(updateRoleQ);
  // const updateManagerAnswers = await getAnswer(updateManagerQ);
  // const deleteEmployeeAnswers = await getAnswer(deleteEmployeeQ);
  // const deleteDepartmentAnswers = await getAnswer(deleteDepartmentQ);
  // const deleteRoleAnswers = await getAnswer(deleteRoleQ);
  // console.log(addEmployeeAnswers);
  // console.log(addRoleAnswers);
  // console.log(updateRoleAnswers);
  // console.log(updateManagerAnswers);
  // console.log(deleteEmployeeAnswers);
  // console.log(deleteDepartmentAnswers);
  // console.log(deleteRoleAnswers);
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
