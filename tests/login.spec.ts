import { test, expect } from "@playwright/test";
import { PageManager } from "../src/utilities/PageManager"
import { validUsers, invalidUsers, UserCredentials } from "../src/data/testUsers";

test.describe("Login Functionality", () => {
    let pm: PageManager;

    test.beforeEach(async ({page}) => {
        pm = new PageManager(page);
        await pm.loginPage.navigateTo();
    });

    validUsers.forEach((user: UserCredentials, index) => {
        test(`Successful user login with valid credentials ${index}: ${user.username}`, async ({page}) => {
            await pm.loginPage.login(user.username, user.password);

            const expectedHomePageUrl = pm.homePage.url;
            await expect(page).toHaveURL(expectedHomePageUrl);
            
            await expect(pm.homePage.menu.logoutButton).toBeHidden();
        })
    })

    invalidUsers.forEach((user: UserCredentials, index) => {
        test(`Unsuccessful user login with invalid credentials ${index}: ${user.username} ${user.password}`, async ({page}) => {
            await pm.loginPage.login(user.username, user.password);

            const expectedLoginUrl = pm.loginPage.url;
            await expect(page).toHaveURL(expectedLoginUrl);

            await expect(pm.loginPage.error).toContainText(user.errorMessage);
        })
    })        
})