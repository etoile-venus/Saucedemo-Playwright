import test, { expect } from "@playwright/test";
import { PageManager } from "../src/utilities/PageManager";
import { sortOption, sortOptions } from "../src/data/testSortCases";
import { HomePage } from "../src/pages/HomePage";



test.describe("Homepage Functionality", () => {
    let pm: PageManager;

    test.beforeEach(async ({page}) => {
        pm = new PageManager(page);
        await pm.loginPage.navigateTo();
        await pm.loginPage.login('standard_user', 'secret_sauce')
    });

    sortOptions.forEach((sort: sortOption) => {
        test(`Sorting by ${sort.option} is valid`, async ({page}) => {
            await pm.homePage.selectSortOptionByName(sort.option);

            const actualItemOrder = await pm.homePage.getDisplayedItem(sort.itemType); 
            const expectedItemOrder = await pm.homePage.getExpectedSortedItems(sort.option);

            expect(actualItemOrder).toEqual(expectedItemOrder);
        })
    })

    test(`All items have valid content`, async ({page}) => {
        const items = await pm.homePage.getInventoryItems();

        for(const item of items) {
            await expect.soft(item.title, `Expected non-empty title`).not.toHaveText('')
            await expect.soft(item.description, `Expected non-empty description for item`).not.toHaveText('');
            await expect.soft(item.price, `Expected non-empty price for item`).not.toHaveText('');
            await expect.soft(item.image, `Image src should be valid`).not.toHaveAttribute('src', /sl-404\.168b1cce/);
            await expect.soft(item.button, `Expected Add/Remove button to be visable`).toBeVisible();
        }
    })
})