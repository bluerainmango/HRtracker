const inquirer = require("inquirer");
// const connection = require("./db/db");

// connection.query("SELECT * FROM department", (err, res) => {
//   // console.log(res);
//   console.table("2nd", res);
// });

exports.mainQ = [
  {
    type: "list",
    name: "mainQuestion",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all departments",
      "View all roles",
      "View all employees by departmnet",
      "View all employees by manager",
      "Add an employee",
      "Add a department",
      "Add a role",
      "Update employee's role",
      "Update employee's manager",
      "Delete an employee",
      "Delete a department",
      "Delete a role",
      "Check the total salaries of each department"
    ]
  }
];

exports.addEmployeeQ = [
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
];

exports.addDepartmentQ = [
  {
    type: "input",
    name: "department",
    message: "What is the new department's name?"
  }
];

exports.addRoleQ = [
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
];

exports.updateRoleQ = [
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
];

exports.updateManagerQ = [
  {
    type: "list",
    name: "employee",
    message: "whos manager do you want to change?",
    choices: []
  },
  {
    type: "list",
    name: "newManager",
    message: "who is the new manager of this employee?",
    choices: []
  }
];
exports.deleteEmployeeQ = [
  {
    type: "list",
    name: "employee",
    message: "who do you want to delete?",
    choices: []
  }
];
exports.deleteDepartmentQ = [
  {
    type: "list",
    name: "department",
    message: "Which department do you want to delete?",
    choices: []
  }
];
exports.deleteRoleQ = [
  {
    type: "list",
    name: "role",
    message: "Which role do you want to delete?",
    choices: []
  }
];

exports.getAnswer = async questions => {
  const answers = await inquirer.prompt(questions);
  return answers;
};
