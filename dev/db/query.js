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
    getAllRoles: `SELECT * FROM role`,
    getAllEmployeesByDept: `SELECT 
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
        department ON department.id = role.department_id ORDER BY department`,
    getAllEmployeesByManager: `SELECT 
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
        department ON department.id = role.department_id ORDER BY manager IS NULL, manager ASC;`
  };
})();
