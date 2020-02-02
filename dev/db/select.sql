-- Bring all roles except current person's role.
SELECT 
    title
FROM
    role
        LEFT JOIN
    employee ON role.id = employee.role_id
WHERE CONCAT(first_name, ' ', last_name) != 'tom dodd' || CONCAT(first_name, ' ', last_name) IS NULL;

-- Self Join (populate manager's name in employee table)
SELECT 
    CONCAT_WS(' ', e.first_name, e.last_name) AS employee,
    CONCAT_WS(' ', m.first_name, m.last_name) AS manager
FROM
    employee e
        LEFT JOIN
    employee m ON e.manager_id = m.id;

-- Show all employees
SELECT 
    e.id,
    e.first_name,
    e.last_name,
    role.title,
    department.name AS department,
    salary,
    CONCAT_WS(' ', m.first_name, m.last_name) AS manager
FROM
    employee e
        LEFT JOIN
    employee m ON e.manager_id = m.id
        LEFT JOIN
    role ON role.id = e.role_id
        LEFT JOIN
    department ON department.id = role.department_id;

-- Show all departments
SELECT * FROM department

-- Show all role
SELECT 
    role.id, title, salary, department.name AS department
FROM
    role
        LEFT JOIN
    department ON role.department_id = department.id;

-- Show all employees by department
SELECT 
	department.name AS department,
    first_name,
    last_name,
    role.title,
    salary
FROM
    employee
        LEFT JOIN
    role ON role.id = employee.role_id
        LEFT JOIN
    department ON department.id = role.department_id ORDER BY department;

-- Show all employees by manager
SELECT 
    IFNULL(CONCAT(m.first_name, ' ', m.last_name),"") AS manager,
    e.first_name,
    e.last_name,
    role.title,
    salary
FROM
    employee e
        LEFT JOIN
    employee m ON m.id = e.manager_id
        LEFT JOIN
    role ON role.id = e.role_id
        LEFT JOIN
    department ON department.id = role.department_id
ORDER BY CASE when manager = "" THEN 1 ELSE 0 END, manager;


-- Add employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (
        ?, 
        ?, 
        (SELECT id FROM role WHERE title = ?),
        (SELECT id FROM (SELECT * FROM employee) AS copiedEmployee WHERE CONCAT(first_name, " ", last_name) = ?)
        );