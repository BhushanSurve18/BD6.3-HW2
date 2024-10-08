const { AsyncLocalStorage } = require('async_hooks');
const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.json());

let employees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    department: 'Marketing',
  },
];

//Functions

async function getAllEmployees() {
  return employees;
}

async function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

async function addEmployee(data) {
  data.id = employees.length + 1;
  employees.push(data);
  return data;
}

app.get('/employees', async (req, res) => {
  const employees = await getAllEmployees();
  return res.json(employees);
});

app.get('/employees/details/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const employee = await getEmployeeById(id);
  if (!employee) return res.status(404).send('Employee not found');
  return res.json(employee);
});

app.post('/employees/new', async (req, res) => {
  const newEmployee = await addEmployee(req.body);
  res.status(201).json(newEmployee);
});

module.exports = { app, getAllEmployees, getEmployeeById, addEmployee };
