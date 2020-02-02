module.exports = (() => {
  return {
    getAllRolesExcept: `SELECT title FROM role LEFT JOIN employee ON role.id = employee.role_id WHERE CONCAT(first_name, ' ', last_name) != ? || CONCAT(first_name, ' ', last_name) IS NULL`,
    getAllEmployees: `SELECT 
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
            department ON department.id = role.department_id`,
    getAllDepartments: `SELECT * FROM department`,
    getAllRoles: `SELECT 
        role.id, title, salary, department.name AS department
    FROM
        role
            LEFT JOIN
        department ON role.department_id = department.id;`,
    getAllEmployeesByDept: `SELECT 
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
        department ON department.id = role.department_id ORDER BY department`,
    getAllEmployeesByManager: `SELECT 
        IFNULL(CONCAT(m.first_name, ' ', m.last_name),"") AS manager,
        department.name AS department,
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
    ORDER BY CASE when manager = "" THEN 1 ELSE 0 END, manager`,
    addEmployee: `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, (SELECT id FROM role WHERE title = ?),(SELECT id FROM (SELECT * FROM employee) AS copiedEmployee WHERE CONCAT(first_name, " ", last_name) = ?));`,
    addDepartment: `INSERT INTO department SET name = ?`
  };
})();
