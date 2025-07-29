import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../data/routes";
import { ItemComponent } from "../components/ItemComponent";
import { TButton, TItemFilter, TSortName } from "../utilities/Types";
import { IItemData } from "../utilities/Interfaces";

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

    async getDisplayedItems(selector: TItemFilter): Promise<string[] | number[]> {
        switch(selector) {
            case 'title': return await this.getDisplayedItemTitles();
            case 'price': return await this.getDisplayedItemPrices();
            // Add more cases later...
            default: throw new Error(`Invalid selector for name: ${selector}`);
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
    async getExpectedSortedItems(sortName: TSortName): Promise<string[] | number[]> {
        switch (sortName) {
            case 'Name (A to Z)': {
                const items = await this.getDisplayedItems('title');
                return (items as string[]).slice().sort((a, b) => a.localeCompare(b));
            }
            case 'Name (Z to A)': {
                const items = await this.getDisplayedItems('title');
                return (items as string[]).slice().sort((a, b) => b.localeCompare(a));
            }
            case 'Price (low to high)': {
                const items = await this.getDisplayedItems('price');
                return (items as number[]).slice().sort((a, b) => a - b);
            }
            case 'Price (high to low)': {
                const items = await this.getDisplayedItems('price');
                return (items as number[]).slice().sort((a, b) => b - a);
            }
            default:
                throw new Error(`Invalid name used for sort: ${sortName}`);
        }
    }

    async clickOnItemButtonsBy(button: TButton, quantity: number): Promise<ItemComponent[]> {
        const items = (await this.getInventoryItems()).slice(0, quantity);
        const selectedItems: ItemComponent[] = [];

        switch (button) {
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
                throw new Error('Invalid button name entered');
        }

        return selectedItems;
    }

    async getItemData(item: ItemComponent, idBy: TItemFilter = 'title'): Promise<IItemData> {
        const id = await item.getId(idBy);
        const title = await item.title.textContent();
        const description = await item.description.textContent();
        const priceText = await item.price.textContent();
        const imageSrc = await item.image.getAttribute('src');
        const button = await item.button.textContent();

        return {
            id: id ?? '',
            title: title?.trim() ?? '',
            description: description?.trim() ?? '',
            price: parseFloat(priceText?.replace('$', '') ?? '0'),
            imageSrc: imageSrc ?? '',
            button: button?.trim() ?? '',
        };
    }

    async getItemDataArray(quantity: number, idBy: TItemFilter = 'title'): Promise<IItemData[]> {
        const items = await this.getInventoryItems();
        const itemsRange = items.slice(0, quantity);
        return Promise.all(itemsRange.map(item => this.getItemData(item, idBy)));
    }

    
}