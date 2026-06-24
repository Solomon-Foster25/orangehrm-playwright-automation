import { test, expect } from '@playwright/test';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test.describe('OrangeHRM API', () => {

  test('GET employees returns 200 and employee data', async ({ request }) => {
    const response = await request.get('/web/index.php/api/v2/pim/employees');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();              // the data array exists
    expect(body.data.length).toBeGreaterThan(0);  // there are employees
  });

  test('GET a specific employee by ID and assert correct data', async ({ request }) => {
    const firstName = 'Get';
    const lastName = `ById${Date.now()}`;
    const employeeId = `${Date.now()}`.slice(-9);
    const createResponse = await request.post('/web/index.php/api/v2/pim/employees', {
      data: { firstName, lastName, employeeId },
    });
    expect(createResponse.status()).toBe(200);
    const empNumber = (await createResponse.json()).data.empNumber;
 
    // Fetch it back by its empNumber and assert the data
    const response = await request.get(`/web/index.php/api/v2/pim/employees/${empNumber}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.employeeId).toBe(employeeId);
    expect(body.data.firstName).toBe(firstName);
    expect(body.data.lastName).toBe(lastName);
  });

  test('POST creates an employee and it persists', async ({ request }) => {
    const lastName = `ApiTest${Date.now()}`;
    const employeeId = `${Date.now()}`.slice(-9);  // unique, fits typical ID length

    // Create
    const createResponse = await request.post('/web/index.php/api/v2/pim/employees', {
        data: {
        firstName: 'Api',
        middleName: '',
        lastName: lastName,
        empPicture: null,
        employeeId: employeeId,
        },
    });
    expect(createResponse.status()).toBe(200); 

    const created = await createResponse.json();
    const empNumber = created.data.empNumber;

    const getResponse = await request.get(`/web/index.php/api/v2/pim/employees/${empNumber}`);
    expect(getResponse.status()).toBe(200);
    const fetched = await getResponse.json();
    expect(fetched.data.lastName).toBe(lastName);
  });

  test('employee created via API appears in the UI', async ({ request, page }) => {
    // API
    const lastName = `Integration${Date.now()}`;
    const response = await request.post('/web/index.php/api/v2/pim/employees', {
        data: { firstName: 'ApiCreated', lastName },
    });
    expect(response.status()).toBe(200);
    // UI
    const list = new EmployeeListPage(page);
    await list.goto();
    await list.searchName(`ApiCreated ${lastName}`);
    await expect(list.resultRowContaining(lastName)).toBeVisible();
  });

  test('PUT updates an employee', async ({ request }) => {
  // Create an employee
  const createResponse = await request.post('/web/index.php/api/v2/pim/employees', {
    data: { firstName: 'Before', lastName: `Update${Date.now()}` },
  });
  const empNumber = (await createResponse.json()).data.empNumber;

  // Update that employee
  const response = await request.put(`/web/index.php/api/v2/pim/employees/${empNumber}/personal-details`, {
    data: { firstName: 'Emerald', lastName: 'Green', employeeId: `${Date.now()}`.slice(-9) },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.firstName).toBe('Emerald');
});

  test('DELETE an employee', async ({ request }) => {
    // Add a new employee
    const createResponse = await request.post('/web/index.php/api/v2/pim/employees', {
        data: {
            firstName: 'ApiTest',
            lastName: `User${Date.now()}`,
        },
    });

    expect(createResponse.status()).toBe(200);
    const empNumber = (await createResponse.json()).data.empNumber;

    // Delete a new employee
    const deleteResponse = await request.delete('/web/index.php/api/v2/pim/employees', {
        data: {ids:[empNumber]},
    });

    expect(deleteResponse.status()).toBe(200);

    const deleteEmployee = await request.get(`/web/index.php/api/v2/pim/employees/${empNumber}`);
    expect(deleteEmployee.status()).toBe(422);
  });

  test('GET non-existent employee', async ({ request }) => {
    const response = await request.get('/web/index.php/api/v2/pim/employees/999999');
    expect(response.status()).toBe(422);
  });

  test('POST with invalid/missing data', async ({ request }) => {
    const lastName = `ApiTest${Date.now()}`;
    const employeeId = `${Date.now()}`.slice(-9);

    // Create
    const createResponse = await request.post('/web/index.php/api/v2/pim/employees', {
        data: {
        firstName: '',
        middleName: '',
        lastName: lastName,
        empPicture: null,
        employeeId: employeeId,
        },
    });

    expect(createResponse.status()).toBe(422);
  });
});