const dotenv = require("dotenv");
const path = require("path");
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

  // Dynamically fill questions' choices with latest data
  do {
    await refreshChoices();
    const { mainQ } = await getAnswer("main");

    // Connect DB and import connection.query(), connection.end() methods
    const db = createDB();

    // Based on the answer to the main question, print query or continue to following questions.
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

//! UTILL FUNCTION : Get query result and print it in console table
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

    case "Check":
      console.table("\n", result);
      break;
  }
};

init();
