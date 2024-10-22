const client = require('../db/connection');
const inquirer = require('inquirer');

function addDepartment(start) {
  inquirer.default.prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of the department?',
  }).then((answer) => {
    client.query('INSERT INTO department (name) VALUES ($1)', [answer.name], (err) => {
      if (err) {
        console.error('Error adding department:', err);
      } else {
        console.log(`Added ${answer.name} to the database`);
      }
      start();
    });
  });
}

function addRole(start) {
  client.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;

    const departments = res.rows.map(department => ({
      name: department.name,
      value: department.id
    }));

    inquirer.default.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
        validate: value => !isNaN(value) || 'Please enter a valid number'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Which department does the role belong to?',
        choices: departments,
      }
    ]).then((answers) => {
      client.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
        [answers.title, answers.salary, answers.department_id],
        (err) => {
          if (err) {
            console.error('Error adding role:', err);
          } else {
            console.log(`Added ${answers.title} to the database`);
          }
          start();
        }
      );
    });
  });
}

function addEmployee(start) {
  client.query('SELECT * FROM role', (err, roleRes) => {
    if (err) throw err;

    const roles = roleRes.rows.map(role => ({
      name: role.title,
      value: role.id
    }));

    client.query('SELECT * FROM employee', (err, employeeRes) => {
      if (err) throw err;

      const managers = employeeRes.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));
      managers.push({ name: 'None', value: null });

      inquirer.default.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "What is the employee's first name?"
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name?"
        },
        {
          type: 'list',
          name: 'role_id',
          message: "What is the employee's role?",
          choices: roles
        },
        {
          type: 'list',
          name: 'manager_id',
          message: "Who is the employee's manager?",
          choices: managers
        }
      ]).then((answers) => {
        client.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
          [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
          (err) => {
            if (err) {
              console.error('Error adding employee:', err);
            } else {
              console.log(`Added ${answers.first_name} ${answers.last_name} to the database`);
            }
            start();
          }
        );
      });
    });
  });
}

module.exports = {
  addDepartment,
  addRole,
  addEmployee
};