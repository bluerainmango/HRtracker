# HRtracker

> CMS(Content Management System) for Human Resource

## Purpose

View, manage the departments, roles, and employees in company to keep track of current business situation.

## How to use

1. Start the server on your local machine.
2. Create database, schema and insert data to created tables(MySQL).
   - Utilize schema.sql, seed.sql files in `dev > db` folder.
3. Run the app by entering `npm start` in CLI.

## Feature

- All questions' choices are dynamically sync and updated based on your answers.
- Supports the following operations.
  - View all employees, departments, roles
  - View all employees by department
  - View all employees by manager
  - Add an employee, department, role
  - Update employee's role
  - Update employee's manager
  - Delete an employee, department, role
  - Check the total salaries of each department

## Demo
