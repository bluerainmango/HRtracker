-- DELETE FROM department;
-- DELETE FROM role;
-- DELETE FROM employee;
INSERT INTO department(name) VALUES ("administrative"),("marketing"),("sales"),("development");


INSERT INTO role (title, salary, department_id)
VALUES ("administration manager", 15000, 1),
("accountant", 6000, 1),
("marketing manager", 18000, 2),
("ecommerce specialist", 7000, 2),
("sales director", 16000, 3),
("local sales", 7000, 3),
("technical manager", 20000, 4),
("backend developer", 6000, 4),
("frontend developer", 6000, 4),
("intern", 5000, 4);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES("Tom", "Dodd", 1, null),("emily", "yu", 2, null);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)VALUES ("john","cho","4","1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Tom", "Dodd", 1, null),("emily", "yu", 2, null),("john","cho","4","1")

 

