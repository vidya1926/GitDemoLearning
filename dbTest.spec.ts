import { test, expect } from '@playwright/test';
import { Client } from 'pg';
import { faker } from '@faker-js/faker';

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432, //Please insert your valid port form your PostgreSQL DB
    password: "password", // Your password
    database: "TestDB" // Your name of database
})

let empName = faker.person.fullName()
let empID = faker.number.int({ min: 10, max: 100 })
let empSalary = faker.finance.amount({min:10000, max: 50000, dec: 2})

test.skip('Create Table with values using DB Connection', async ({}) => {
   
    const sqlQuery: string = `
    CREATE TABLE Employee (
      EmployeeID SERIAL PRIMARY KEY,
      EmployeeName VARCHAR(255) NOT NULL,
      EmployeeSalary DECIMAL(10, 2)
    )`
    const res = await client.query(sqlQuery)
    expect(res.command).toBe('CREATE');
    
});

test('Insert Data using DB Connection', async ({}) => {
   
    const insertDataQuery: string = `
    INSERT INTO Employee (EmployeeName, EmployeeSalary) 
    VALUES ('${empName}', ${empSalary})`

    const res = await client.query(insertDataQuery)
    expect(res.command).toBe('INSERT');
    console.log(`No of Rows Inserted ${res.rowCount}`)     
});

test('Select Data using DB Connection', async ({}) => {
    
     const selectDataQuery: string = `
     SELECT * FROM Employee`
    
     const res = await client.query(selectDataQuery)
     expect(res.command).toBe('SELECT');
     console.log(`No of Rows in Table ${res.rows.length}`)
     if (res.rows.length !== null) {
          for (let i=0;i<res.rows.length;i++){
                console.log(`Row ${i+1} Employee Name ${res.rows[i].employeename}`)
                console.log(`Row ${i+1} Employee Salary ${res.rows[i].employeesalary}`)
          }
     }    
    });

test.beforeAll(async ({}) => {
    console.log('=========== Tests started ===========');
    await client.connect();
});

test.afterAll(async ({}) => {
    await client.end();
    console.log('=========== Tests stoped ===========');
});