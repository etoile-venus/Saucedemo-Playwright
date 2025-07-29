import { test, expect } from "@playwright/test";
import { testWithCookie } from "./fixtures/testWithCookie";
import { PageManager } from "../src/utilities/PageManager";
import { productSortOptions } from "../src/data/providers/SortCasesProvider";
import { IItemData, IProductSortOption } from "../src/utilities/Interfaces";
import { quantities } from "../src/data/providers/QuantityProvider";
import { ItemPage } from "../src/pages/ItemPage";



test.describe("HomePage Functionality", () => {
    let pm: PageManager;

    test.beforeEach(async ({page}) => {
        pm = new PageManager(page);
    });

    test.describe('Sort Validation', () => {
        for (const sort of productSortOptions) {
        testWithCookie(`Sorting by ${sort.option} is valid`, async ({page}) => {
            await pm.homePage.selectSortOptionByName(sort.option);

            const actualItemOrder = await pm.homePage.getDisplayedItems(sort.itemType); 
            const expectedItemOrder = await pm.homePage.getExpectedSortedItems(sort.option);

            expect(actualItemOrder).toEqual(expectedItemOrder);
        })}
    })

    test.describe('Content Validation', () => {
        testWithCookie(`All items have valid content`, async ({page}) => {
            const items = await pm.homePage.getInventoryItems();

            for(const item of items) {
                await expect.soft(item.title, `Expected non-empty title`).not.toHaveText('')
                await expect.soft(item.description, `Expected non-empty description for item`).not.toHaveText('');
                await expect.soft(item.price, `Expected non-empty price for item`).not.toHaveText('');
                await expect.soft(item.image, `Image src should be valid`).not.toHaveAttribute('src', /sl-404\.168b1cce/);
                await expect.soft(item.button, `Expected Add/Remove button to be visible`).toBeVisible();
            }
        })
    })
    

    test.describe.parallel('Item Page Content Validation', () => {
        for (const quantity of quantities) {
        testWithCookie(`${quantity} - Title takes you Item Page with valid content`, async({page}) => {
            for(let i = 0; i < quantity; i++) {
                const item = (await pm.homePage.getInventoryItems())[i];
                const expectedItem: IItemData = await pm.homePage.getItemData(item, 'title');

                await item.clickOnItemBy('title');
                const actualItem: ItemPage = pm.itemPage;

                await expect.soft(page).toHaveURL(pm.itemPage.url + expectedItem.id);
                await expect.soft(actualItem.title).toHaveText(expectedItem.title);
                await expect.soft(actualItem.description).toHaveText(expectedItem.description);
                await expect.soft(actualItem.price).toHaveText('$' + expectedItem.price);
                await expect.soft(actualItem.button).toHaveText(expectedItem.button);
                await expect.soft(actualItem.image).toHaveAttribute('src', expectedItem.imageSrc);

                await actualItem.backToProducts.click()
            }
        })}

        for (const quantity of quantities) {
        testWithCookie(`${quantity} - Image takes you Item Page with valid content`, async({page}) => {
            for(let i = 0; i < quantity; i++) {
                const item = (await pm.homePage.getInventoryItems())[i];
                const expectedItem: IItemData = await pm.homePage.getItemData(item, 'image');

                await item.clickOnItemBy('image');
                const actualItem: ItemPage = pm.itemPage;

                await expect.soft(page).toHaveURL(pm.itemPage.url + expectedItem.id);
                await expect.soft(actualItem.title).toHaveText(expectedItem.title);
                await expect.soft(actualItem.description).toHaveText(expectedItem.description);
                await expect.soft(actualItem.price).toHaveText('$' + expectedItem.price);
                await expect.soft(actualItem.button).toHaveText(expectedItem.button);
                await expect.soft(actualItem.image).toHaveAttribute('src', expectedItem.imageSrc);

                await actualItem.backToProducts.click()
            }
        })}
    })


    test.describe.parallel('Cart Icon and Button Validations', () => {
        for (const quantity of quantities) {
        testWithCookie(`${quantity} - Add button successfuly updated cart icon`, async({page}) => {
            const expectedItems = await pm.homePage.clickOnItemButtonsBy('add', quantity);

            await expect(pm.homePage.menu.cartIcon).toHaveText(quantity.toString());

            for (const item of expectedItems) {
                await expect.soft(item.button).toHaveText('remove', { ignoreCase: true });
            }
        })}

        for (const quantity of quantities) {
        testWithCookie(`${quantity} - Remove button successfuly updated cart icon`, async({page}) => {
            const expectedItems = await pm.homePage.clickOnItemButtonsBy('add', quantity);

            for (const item of expectedItems) {
                await item.clickRemoveButton();
                await expect.soft(item.button).toContainText('add', { ignoreCase: true });
            }

            await expect(pm.homePage.menu.cartIcon).toBeEmpty();
        })}
    })


})