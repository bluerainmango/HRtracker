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
  updateRoleQ,
  updateManagerQ,
  deleteEmployeeQ,
  deleteDepartmentQ,
  deleteRoleQ,
  getAnswer
} = require("./dev/inquirer");

const init = async () => {
  // cycle
  // 1 refresh db

  const db = createDB();
  const roles = await db.query("SELECT title FROM role");
  const employees = await db.query(
    "SELECT CONCAT(first_name, ' ' , last_name) AS name FROM employee"
  );
  const departments = await db.query(
    "SELECT name AS department FROM department"
  );

  roles.forEach(el => {
    addEmployeeQ[2].choices.push(el.title);
    updateRoleQ[1].choices.push(el.title);
    deleteRoleQ[0].choices.push(el.title);
  });

  employees.forEach(el => {
    addEmployeeQ[3].choices.push(el.name);
    updateRoleQ[0].choices.push(el.name);
    updateManagerQ[0].choices.push(el.name);
    deleteEmployeeQ[0].choices.push(el.name);
  });

  //! updateRole! 2 questions : need to ommit the current role
  updateRoleQ[1].choices = async answers => {
    const qry = `SELECT title FROM role LEFT JOIN employee ON role.id = employee.role_id WHERE CONCAT(first_name, ' ', last_name) != ? || CONCAT(first_name, ' ', last_name) IS NULL;`;

    const rows = await db.query(qry, answers.employee);
    const rolesArr = rows.map(row => {
      return row.title;
    });

    return rolesArr;
  };

  // Show all employees except himself/herself.
  updateManagerQ[1].choices = answers => {
    return updateManagerQ[0].choices.filter(el => el !== answers.employee);
  };

  departments.forEach(el => {
    addRoleQ[2].choices.push(el.department);
    deleteDepartmentQ[0].choices.push(el.department);
  });

  // const addEmployeeAnswers = await getAnswer(addEmployeeQ);
  // const addRoleAnswers = await getAnswer(addRoleQ);
  const updateRoleAnswers = await getAnswer(updateRoleQ);
  // const updateManagerAnswers = await getAnswer(updateManagerQ);
  // const deleteEmployeeAnswers = await getAnswer(deleteEmployeeQ);
  // const deleteDepartmentAnswers = await getAnswer(deleteDepartmentQ);
  // const deleteRoleAnswers = await getAnswer(deleteRoleQ);

  // console.log(addEmployeeAnswers);
  // console.log(addRoleAnswers);
  console.log(updateRoleAnswers);
  // console.log(updateManagerAnswers);
  // console.log(deleteEmployeeAnswers);
  // console.log(deleteDepartmentAnswers);
  // console.log(deleteRoleAnswers);

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
