const dotenv = require("dotenv");
const path = require("path");
const figlet = require("figlet");
require("console.table");

// Connect to DB
const createDB = require("./dev/db/db");

// Bring queries
const query = require("./dev/db/query");

// Set env
dotenv.config({ path: path.join(__dirname, "config.env") });

// Import Inquirer
const { refreshChoices, getAnswer } = require("./dev/inquirer");

//! FUCTION : init
const init = async () => {
  let loop = true;

  //* APP Logo print
  console.log(
    figlet.textSync(" HR Tracker", {
      font: "ANSI Shadow",
      horizontalLayout: "default",
      verticalLayout: "default"
    })
  );

  //* Do ~ While loop
  do {
    // 1. Dynamically fill questions' choices with latest data in every loop
    await refreshChoices();

    // 2. Get answer to the main question
    const { mainQ } = await getAnswer("main");

    // 3. Connect DB and import connection.query(), connection.end() methods
    const db = createDB();

    // 4. Based on the mainQ answer, print a query result right away or continue to following questions.
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
        // 1. Get additional answers to related questions
        const { fname, lname, role, manager } = await getAnswer("addEmployee");

        // 2. Print
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

      case "Add a role":
        const { title, salary, deptOfRole } = await getAnswer("addRole");
        await showTable(db, mainQ, query.addRole, [title, salary, deptOfRole]);
        break;

      case "Update employee's role":
        const { employee, newRole } = await getAnswer("updateEmployeeRole");
        await showTable(db, mainQ, query.updateEmployeeRole, [
          newRole,
          employee
        ]);
        break;

      case "Update employee's manager":
        const { employeeToUpdateManager, newManager } = await getAnswer(
          "updateManager"
        );
        await showTable(db, mainQ, query.updateEmployeeManager, [
          newManager,
          employeeToUpdateManager
        ]);
        break;

      case "Delete an employee":
        const { employeeToDel } = await getAnswer("deleteEmployee");
        await showTable(db, mainQ, query.deleteEmployee, [employeeToDel]);
        break;

      case "Delete a department":
        const { deptToDel } = await getAnswer("deleteDepartment");
        await showTable(db, mainQ, query.deleteDept, [deptToDel]);
        break;

      case "Delete a role":
        const { roleToDel } = await getAnswer("deleteRole");
        await showTable(db, mainQ, query.deleteRole, [roleToDel]);
        break;

      case "Check the total salaries of each department":
        await showTable(db, mainQ, query.checkSalaryByDept);
        break;

      case "Exit":
        // Stop looping the prompt then end database and process
        loop = false;
        db.end();
        process.exit(0);
    }
  } while (loop);
};

//! UTILL FUNCTION : Get a query result and print it
const showTable = async (db, choice, query, args) => {
  const result = await db.query(query, args);

  const firstWordOfAnswer = choice.split(" ")[0];

  // CASE 1. View & Check : print a query result in table
  if (firstWordOfAnswer === "View" || firstWordOfAnswer === "Check") {
    console.table("\n", result);
  } else {
    // CASE 2. Add, Update, Delete : no print a query result but general alert
    const action = firstWordOfAnswer.endsWith("e")
      ? firstWordOfAnswer + "d"
      : firstWordOfAnswer + "ed";

    console.log(`👍 Successfully ${action}!`);
  }
};

init();
