import { test, expect } from "@playwright/test";
import { AddUserPage } from "../pages/AddUserPage";
import { UserListPage } from "../pages/UserListPage";

test.describe('Admin', () => {
    test('Add a new user', async ({ page, request }) => {
        const firstName = 'UserOwner';
        const lastName = `Add${Date.now()}`;
        const createResponse = await request.post('/web/index.php/api/v2/pim/employees', {
            data: { firstName, lastName },
        });
        expect(createResponse.status()).toBe(200);
 
        const uniqueUser = `user${Date.now()}`;
        const newUser = new AddUserPage(page);
        await newUser.goto();
        await newUser.addUser('Admin', `${firstName} ${lastName}`, 'Enabled', uniqueUser, 'Password123', 'Password123');
        await expect(page.getByText(uniqueUser)).toBeVisible();
    });

    test('Search for a user by username', async ({ page }) => {
        const search = new UserListPage(page);
        await search.goto();
        await search.searchUser('Admin');
        await expect(page.getByText('(1) Record Found')).toBeVisible();
    })

    test('Empty required fields', async ({ page }) => {
        const emptyField = new AddUserPage(page);
        await emptyField.goto();
        await emptyField.saveButton.click();
        await expect(page.getByText('Required')).toHaveCount(6);
        await expect(page.getByText('Passwords do not match')).toBeVisible();
    })
    
    test('Password Mismatch', async ({ page, request }) => {
        const firstName = 'UserOwner';
        const lastName = `Mismatch${Date.now()}`;
        const createResponse = await request.post('/web/index.php/api/v2/pim/employees', {
            data: { firstName, lastName },
        });
        expect(createResponse.status()).toBe(200);
 
        const uniqueUser = `user${Date.now()}`;
        const passwordMismatch = new AddUserPage(page);
        await passwordMismatch.goto();
        await passwordMismatch.addUser('Admin', `${firstName} ${lastName}`, 'Enabled', uniqueUser, 'Password1', 'Password123');
        await expect(page.getByText('Passwords do not match')).toBeVisible();

    })

    test('Search non-existent user', async ({ page }) => {
        const search = new UserListPage(page);
        await search.goto();
        await search.searchUser('Lenny');
        await expect(page.getByText('No Records Found').first()).toBeVisible();
    })
});