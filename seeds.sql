
INSERT INTO department (name) VALUES ('Engineering'), ('Human Resources'), ('Finance')
ON CONFLICT (name) DO NOTHING;


INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1), 
('HR Manager', 60000, 2), 
('Accountant', 55000, 3)
ON CONFLICT (title) DO NOTHING;


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL), 
('Jane', 'Smith', 2, 1), 
('Alex', 'Johnson', 3, 1)
ON CONFLICT DO NOTHING;