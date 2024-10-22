
const client = require('../db/connection');

function viewAllDepartments(start) {
  client.query('SELECT * FROM department', (err, res) => {
    if (err) {
      console.error('Error fetching departments:', err);
    } else {
      console.table(res.rows);
    }
    if (typeof start === 'function') start(); 
  });
}

function viewAllRoles(start) {
  const query = `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id;
  `;
  client.query(query, (err, res) => {
    if (err) {
      console.error('Error fetching roles:', err);
    } else {
      console.table(res.rows);
    }
    if (typeof start === 'function') start(); 
  });
}

function viewAllEmployees(start) {
  const query = `
    SELECT employee.id, employee.first_name, employee.last_name, 
           role.title AS title, department.name AS department, role.salary,
           CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;
  `;
  client.query(query, (err, res) => {
    if (err) {
      console.error('Error fetching employees:', err);
    } else {
      console.table(res.rows);
    }
    if (typeof start === 'function') start(); 
  });
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees
};