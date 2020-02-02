const inquirer = require("inquirer");

const createDB = require("./db/db");
const query = require("./db/query");

// Dynamically fill questions' choices with data
exports.refreshChoices = async () => {
  const db = createDB();

  // 1. Bring data from DB
  const roles = await db.query("SELECT title FROM role");
  const employees = await db.query(
    "SELECT CONCAT(first_name, ' ' , last_name) AS name FROM employee"
  );
  const departments = await db.query(
    "SELECT name AS department FROM department"
  );

  //2. Fill each question's choices with data
  roles.forEach(el => {
    questions.addEmployeeQ[2].choices.push(el.title);
    // console.log("updateRole: ", questions.updateRoleQ[1].choices);
    // questions.updateRoleQ[1].choices.push(el.title);
    questions.deleteRoleQ[0].choices.push(el.title);
  });

  employees.forEach(el => {
    questions.addEmployeeQ[3].choices.push(el.name);
    questions.updateRoleQ[0].choices.push(el.name);
    questions.updateManagerQ[0].choices.push(el.name);
    questions.deleteEmployeeQ[0].choices.push(el.name);
  });

  departments.forEach(el => {
    questions.addRoleQ[2].choices.push(el.department);
    questions.deleteDepartmentQ[0].choices.push(el.department);
  });

  //* [Special case] addEmployeeQ - 3rd question's choices
  // Add none.
  if (!questions.addEmployeeQ[3].choices.includes("none")) {
    questions.addEmployeeQ[3].choices.unshift("none");
  }

  //* [Special case] updateRoleQ - 2nd question's choices func
  // Show all roles except current person's role.
  questions.updateRoleQ[1].choices = async answers => {
    const rows = await db.query(query.getAllRolesExcept, answers.employee);

    const rolesArr = rows.map(row => {
      return row.title;
    });
    console.log("roles: ", rows);
    // Delete duplicated roles
    return Array.from(new Set(rolesArr));
  };

  //* [Special case] updateManagerQ - 2nd question's choice func
  // Show all employees except himself/herself.
  questions.updateManagerQ[1].choices = answers => {
    return questions.updateManagerQ[0].choices.filter(
      el => el !== answers.employee
    );
  };

  // db.end();
};

const questions = {
  mainQ: [
    {
      type: "list",
      name: "mainQ",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "View all employees by department",
        "View all employees by manager",
        "Add an employee",
        "Add a department",
        "Add a role",
        "Update employee's role",
        "Update employee's manager",
        "Delete an employee",
        "Delete a department",
        "Delete a role",
        "Check the total salaries of each department",
        "Exit"
      ]
    }
  ],
  addEmployeeQ: [
    {
      type: "input",
      name: "fname",
      message: "What is this employee's first name?"
    },
    {
      type: "input",
      name: "lname",
      message: "What is this employee's last name?"
    },
    {
      type: "list",
      name: "role",
      message: "What is the role of this employee?",
      choices: []
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the manager of this employee?",
      choices: []
    }
  ],
  addDepartmentQ: [
    {
      type: "input",
      name: "department",
      message: "What is the new department's name?"
    }
  ],
  addRoleQ: [
    {
      type: "input",
      name: "title",
      message: "What role do you want to newly add?"
    },
    {
      type: "input",
      name: "salary",
      message: "How much is this role's salary?"
    },
    {
      type: "list",
      name: "department",
      message: "What department does this role belong to?",
      choices: []
    }
  ],
  updateRoleQ: [
    {
      type: "list",
      name: "employee",
      message: "who's role do you want to change?",
      choices: []
    },
    {
      type: "list",
      name: "newRole",
      message: "What is this employee's new role?",
      choices: []
    }
  ],
  updateManagerQ: [
    {
      type: "list",
      name: "employeeToUpdateManager",
      message: "whos manager do you want to change?",
      choices: []
    },
    {
      type: "list",
      name: "newManager",
      message: "who is the new manager of this employee?",
      choices: []
    }
  ],
  deleteEmployeeQ: [
    {
      type: "list",
      name: "employee",
      message: "who do you want to delete?",
      choices: []
    }
  ],
  deleteDepartmentQ: [
    {
      type: "list",
      name: "department",
      message: "Which department do you want to delete?",
      choices: []
    }
  ],
  deleteRoleQ: [
    {
      type: "list",
      name: "role",
      message: "Which role do you want to delete?",
      choices: []
    }
  ]
};

exports.getAnswer = async category => {
  let q = [];

  switch (category) {
    case "main":
      q = questions.mainQ;
      break;

    case "addEmployee":
      q = questions.addEmployeeQ;
      break;

    case "addRole":
      q = questions.addRoleQ;
      break;

    case "addDepartment":
      q = questions.addDepartmentQ;
      break;

    case "updateEmployeeRole":
      q = questions.updateRoleQ;
      break;

    case "updateManager":
      q = questions.updateManagerQ;
      break;

    case "deleteEmployee":
      q = questions.deleteEmployeeQ;
      break;

    case "deleteDepartment":
      q = questions.deleteDepartmentQ;
      break;

    case "deleteRole":
      q = questions.deleteRoleQ;
      break;
  }

  return await inquirer.prompt(q);
};
