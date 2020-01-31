const inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    name: "menu",
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
      "Update employee role",
      "Update employee manager",
      "Delete an employee",
      "Delete a department",
      "Delete a role"
    ]
  }
];

questions;
inquirer.prompt(questions).then(answers => {
  console.log(answers);
});
