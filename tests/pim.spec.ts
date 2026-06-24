import { test, expect } from '@playwright/test';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test.describe('PIM', () => {
    test('Add a new employee', async ({ page }) => {
        const uniqueLast = `Test${Date.now()}`; // adds a unique last name on every test run, avoiding colliding names
        const newEmployee = new AddEmployeePage(page);
        await newEmployee.goto();
        await newEmployee.addEmployee('Auto', uniqueLast);
        await expect(page).toHaveURL(/viewPersonalDetails/);
    });

    test('Search for an existing employee by name', async ({ page, request }) => {
        const firstName = 'Searchable';
        const lastName = `Name${Date.now()}`;
        const createResponse = await request.post('/web/index.php/api/v2/pim/employees', {
            data: { firstName, lastName },
        });
        expect(createResponse.status()).toBe(200);
 
        const list = new EmployeeListPage(page);
        await list.goto();
        await list.searchName(`${firstName} ${lastName}`);
        await expect(list.resultRowContaining(lastName)).toBeVisible();

    });

    test('Search by employee ID', async ({ page, request }) => {
        const firstName = 'Searchable';
        const lastName = `Id${Date.now()}`;
        const employeeId = `${Date.now()}`.slice(-9);
        const createResponse = await request.post('/web/index.php/api/v2/pim/employees', {
            data: { firstName, lastName, employeeId },
        });
        expect(createResponse.status()).toBe(200);
 
        const list = new EmployeeListPage(page);
        await list.goto();
        await list.searchById(employeeId);
        await expect(list.resultRowContaining(employeeId).first()).toBeVisible();

    });

    test('Save add employee with fields empty', async ({ page }) => {
        const newEmployee = new AddEmployeePage(page);
        await newEmployee.goto();
        await newEmployee.addEmployee('','');
        await expect(newEmployee.requiredMessage.first()).toBeVisible();
    }); 

    test('Search for a non-existent employee, "No Records Found" shows', async ({ page }) => {
        const list = new EmployeeListPage(page);
        await list.goto();
        await list.searchName('John Yang');
        await expect(list.noRecordsFound.first()).toBeVisible();
    });
});