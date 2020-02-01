const dotenv = require("dotenv");
const path = require("path");
require("console.table");

dotenv.config({ path: path.join(__dirname, "config.env") });

// Connect to DB
// const createDB = require("./dev/db/db");

// Inquirer
const { refreshChoices, getAnswer } = require("./dev/inquirer");

const init = async () => {
  // cycle
  // 1 refresh db

  await refreshChoices();
  const ans = await getAnswer("main");
  console.log(ans);

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
