import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../data/routes";
import { ItemComponent } from "../components/ItemComponent";

export class HomePage extends BasePage{
    get url(): string { return ROUTES.BASE_URL + ROUTES.HOME; }
    
    get productSortDropdown(): Locator { return this.page.locator('select[data-test="product-sort-container"]'); }
    get item(): Locator { return this.page.locator('div[data-test="inventory-item"]'); }
    get itemName(): Locator { return this.page.locator('div[data-test="inventory-item-name"]'); }
    get itemPrice(): Locator { return this.page.locator('div[data-test="inventory-item-price"]'); }

    constructor(page: Page) {
        super(page);
    }

    async waitForPageToLoad(): Promise<void> {
        await this.getInventoryItems();
    }


    //** SORT SELECT METHOD */
    async selectSortOptionByName(label: string): Promise<void> {
        await this.productSortDropdown.selectOption({ label });
    }

    //** INVENTORY ITEM METHODS */
    async getInventoryItems(): Promise<ItemComponent[]> {
        const items: Locator[] = await this.item.all();
        return items.map(item => new ItemComponent(item));
    }

    async getDisplayedItem(itemType: 'title' | 'price'): Promise<string[] | number[]> {
        switch(itemType) {
            case 'title': return await this.getDisplayedItemTitles();
            case 'price': return await this.getDisplayedItemPrices();
            default: throw new Error(`Invalid itemType: ${itemType}`);
        }
    }
    async getDisplayedItemTitles(): Promise<string[]> {
        return await this.itemName.allTextContents();
    }
    async getDisplayedItemPrices(): Promise<number[]> {
        const itemPrices: string[] = await this.itemPrice.allTextContents();
        return itemPrices.map(text => {
            const cleanedText = text.replace('$', '');
            return parseFloat(cleanedText);
        });
    }
    async getExpectedSortedItems(sortLabel: string): Promise<string[] | number[]> {
        switch (sortLabel) {
            case 'Name (A to Z)': {
                const items = await this.getDisplayedItem('title');
                return (items as string[]).slice().sort((a, b) => a.localeCompare(b));
            }
            case 'Name (Z to A)': {
                const items = await this.getDisplayedItem('title');
                return (items as string[]).slice().sort((a, b) => b.localeCompare(a));
            }
            case 'Price (low to high)': {
                const items = await this.getDisplayedItem('price');
                return (items as number[]).slice().sort((a, b) => a - b);
            }
            case 'Price (high to low)': {
                const items = await this.getDisplayedItem('price');
                return (items as number[]).slice().sort((a, b) => b - a);
            }
            default:
                throw new Error(`Invalid sortLabel: ${sortLabel}`);
        }
    }

    async clickOnItemButtonsBy(buttonType: 'add' | 'remove', quantity: number): Promise<ItemComponent[]> {
        const items = (await this.getInventoryItems()).slice(0, quantity);
        const selectedItems: ItemComponent[] = [];

        switch (buttonType) {
            case 'add':
                for (const item of items) {
                    await item.clickAddButton();
                    selectedItems.push(item);
                }
                break;
            case 'remove':
                for (const item of items) {
                    await item.clickRemoveButton();
                    selectedItems.push(item);
                    }
                break;
            default:
                throw new Error('Invalid buttonType entered');
        }

        return selectedItems;
    }
}