const client = require('../db/connection');
const inquirer = require('inquirer');


function updateEmployeeRole() {
  
  client.query('SELECT * FROM employees', (err, employeeRes) => {
    if (err) throw err;

    const employees = employeeRes.rows.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    
    client.query('SELECT * FROM roles', (err, roleRes) => {
      if (err) throw err;

      const roles = roleRes.rows.map(role => ({
        name: role.title,
        value: role.id,
      }));

      
      inquirer.prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select the employee whose role you want to update:',
          choices: employees,
        },
        {
          type: 'list',
          name: 'role_id',
          message: "Select the employee's new role:",
          choices: roles,
        },
      ]).then((answers) => {
        const { employee_id, role_id } = answers;

        
        client.query(
          'UPDATE employees SET role_id = $1 WHERE id = $2',
          [role_id, employee_id],
          (err) => {
            if (err) throw err;
            console.log("Employee's role updated successfully!");
            start(); 
          }
        );
      });
    });
  });
}

module.exports = {
  updateEmployeeRole,
};