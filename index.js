const inquirer = require('inquirer');
const { addDepartment, addRole, addEmployee } = require('./queries/add.js');
const { viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./queries/view.js');
const client = require('./db/connection');

function start() {
  inquirer.default.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Exit',
    ],
  }).then((answer) => {
    switch (answer.action) {
      case 'View All Departments':
        viewAllDepartments(start);
        break;
      case 'View All Roles':
        viewAllRoles(start);
        break;
      case 'View All Employees':
        viewAllEmployees(start);
        break;
      case 'Add a Department':
        addDepartment(start);
        break;
      case 'Add a Role':
        addRole(start);
        break;
      case 'Add an Employee':
        addEmployee(start);
        break;
      case 'Exit':
        client.end();
        console.log('Goodbye!');
        process.exit();
    }
  });
}

start();