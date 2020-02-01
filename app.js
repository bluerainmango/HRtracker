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
const showTable = async (db, query, title) => {
  const result = await db.getQuery(query);
  // console.log("query: ", query);
  // console.log("result: ", result);
  console.table(title.toUpperCase(), result);
  db.end();
};

//* FUCTION : init
const init = async () => {
  let loop = true;

  // Dynamically fill questions' choices with latest data
  do {
    await refreshChoices();
    const answerTo = await getAnswer("main");

    // Connect DB for query
    const db = createDB();

    // According to answer of main question, print query or conseuqent questions.
    switch (answerTo.mainQuestion) {
      case "View all employees":
        showTable(db, query.getAllEmployees, "View all employees");
        break;

      case "View all departments":
        showTable(db, query.getAllDepartments, "View all departments");
        break;

      case "View all roles":
        showTable(db, query.getAllRoles);
        break;

      case "View all employees by department":
        showTable(db, query.getAllEmployeesByDept);
        break;

      case "View all employees by manager":
        showTable(db, query.getAllRoles);
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
