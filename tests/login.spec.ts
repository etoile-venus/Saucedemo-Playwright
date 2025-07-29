import { test, expect } from "@playwright/test";
import { PageManager } from "../src/utilities/PageManager"
import { invalidUsers, validUsers } from "../src/data/providers/UsersProvider";
import { IUserCredentials } from "../src/utilities/Interfaces"

test.describe("LoginPage Functionality", () => {
    let pm: PageManager;

    test.beforeEach(async ({page}) => {
        pm = new PageManager(page);
        await pm.loginPage.navigateTo();
    });

    test.describe('User Login Validation', () => {
        for (const user of validUsers) {
            test(`Successful login - valid credentials: ${user.username} ${user.password}`, async ({page}) => {
                await pm.loginPage.login(user.username, user.password);

                const expectedHomePageUrl = pm.homePage.url;
                await expect(page).toHaveURL(expectedHomePageUrl);
                
                await expect(pm.homePage.menu.logoutButton).toHaveCount(1);
            })
        }

        for (const user of invalidUsers) {
            test(`Unsuccessful login - invalid credentials: ${user.username} ${user.password}`, async ({page}) => {
                await pm.loginPage.login(user.username, user.password);

                const expectedLoginUrl = pm.loginPage.url;
                await expect(page).toHaveURL(expectedLoginUrl);

                await expect(pm.loginPage.error).toContainText(user.errorMessage);
            })
        }
    })
})