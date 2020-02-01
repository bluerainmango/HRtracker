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
SELECT * FROM role

-- Show all employees by department
SELECT 
	department.name AS department,
    employee.id,
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
    CONCAT(m.first_name," ", m.last_name) AS manager,
	m.manager_id,
    department.name AS department,
    e.first_name,
    e.last_name,
    role.title,
    salary
FROM
    employee e
        LEFT JOIN
    employee m ON e.id = m.manager_id
        LEFT JOIN
    role ON role.id = e.role_id
        LEFT JOIN
    department ON department.id = role.department_id ORDER BY manager IS NULL, manager ASC;