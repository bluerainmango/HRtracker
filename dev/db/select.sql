-- Bring all roles except current person's role.
SELECT 
    title
FROM
    role
        LEFT JOIN
    employee ON role.id = employee.role_id
WHERE CONCAT(first_name, ' ', last_name) != 'tom dodd' || CONCAT(first_name, ' ', last_name) IS NULL;