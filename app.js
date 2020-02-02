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
const showTable = async (db, choice, query, args) => {
  const result = await db.query(query, args);

  switch (choice.split(" ")[0]) {
    case "View":
      console.table("\n", result);
      break;

    case "Add":
      console.log("Successfully Added!");
      break;

    case "Update":
      console.log("Successfully Updated!");
      break;

    case "Delete":
      console.log("Successfully Deleted!");
      break;

    default:
      break;
  }

  db.end();
};

//* FUCTION : init
const init = async () => {
  let loop = true;

  // Dynamically fill questions' choices with latest data
  do {
    await refreshChoices();
    const { mainQ } = await getAnswer("main");

    // Connect DB for query
    const db = createDB();

    // According to answer of main question, print query or conseuqent questions.
    switch (mainQ) {
      case "View all employees":
        await showTable(db, mainQ, query.getAllEmployees);
        break;

      case "View all departments":
        await showTable(db, mainQ, query.getAllDepartments);
        break;

      case "View all roles":
        await showTable(db, mainQ, query.getAllRoles);
        break;

      case "View all employees by department":
        await showTable(db, mainQ, query.getAllEmployeesByDept);
        break;

      case "View all employees by manager":
        await showTable(db, mainQ, query.getAllEmployeesByManager);
        break;

      case "Add an employee":
        const { fname, lname, role, manager } = await getAnswer("addEmployee");

        await showTable(db, mainQ, query.addEmployee, [
          fname,
          lname,
          role,
          manager
        ]);
        break;

      case "Add a department":
        const { department } = await getAnswer("addDepartment");

        await showTable(db, mainQ, query.addDepartment, [department]);
        break;

      case "Exit":
        loop = false;
        db.end();
        break;
    }
  } while (loop);

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

init();
