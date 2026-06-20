import { test, expect } from '@playwright/test';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test.describe('PIM', () => {
    test('Add a new employee', async ({ page }) => {
        const uniqueLast = `Test${Date.now()}`; // adds a unique last name on every test run, avoiding colliding names
        const newEmployee = new AddEmployeePage(page);
        await newEmployee.goto();
        await newEmployee.addEmployee('Auto', uniqueLast);
        await expect(page.getByText(`Auto ${uniqueLast}`)).toBeVisible();
    });

    test('Search for an existing employee by name', async ({ page }) => {
        const list = new EmployeeListPage(page);
        await list.goto();
        await list.searchName('Emily Jones');
        await expect(list.resultRowContaining('Emily Jones')).toBeVisible();
    });

    test('Search by employee ID', async ({ page }) => {
        const list = new EmployeeListPage(page);
        await list.goto();
        await list.searchById('0303');
        await expect(list.resultRowContaining('0303').first()).toBeVisible();
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