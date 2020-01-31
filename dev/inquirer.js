const inquirer = require("inquirer");

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
      "Update employee role",
      "Update employee manager",
      "Delete an employee",
      "Delete a department",
      "Delete a role"
    ]
  }
];

// exports.addEmployeeQ = [
//   {
//     type: "input",
//     name: "fname",
//     message: "What is this employee's first name?"
//   },
//   {
//     type: "input",
//     name: "lname",
//     message: "What is this employee's last name?"
//   },
//   {
//     type: "list",
//     name: "role",
//     message: "What is the role of this employee?",
//     choices: roleArr
//   },
//   {
//     type: "list",
//     name: "manager",
//     message: "Who is the manager of this employee?",
//     choices: managerArr
//   }
// ];

// exports.addDepartmentQ = [
//   {
//     type: "input",
//     name: "department",
//     message: "What is the department's name?"
//   }
// ];

// exports.addRoleQ = [
//   {
//     type: "input",
//     name: "title",
//     message: "What is this role's name?"
//   },
//   {
//     type: "input",
//     name: "salary",
//     message: "What is this role's salary?"
//   },
//   {
//     type: "list",
//     name: "department",
//     message: "What is this role's department?",
//     choices: departmentArr
//   }
// ];

exports.getAnswer = async questions => {
  const answers = await inquirer.prompt(questions);
  return answers;
};
