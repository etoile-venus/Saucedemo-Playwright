import { Locator } from "@playwright/test";

export class ItemComponent {
    readonly root: Locator;
    
    constructor(root: Locator) {
        this.root = root;
    }
    
    //** GETTERS */
    get title(): Locator {
        return this.root.locator('div[data-test="inventory-item-name"]');
    }
    get description(): Locator {
        return this.root.locator('div[data-test="inventory-item-desc"]');
    }
    get price(): Locator {
        return this.root.locator('div[data-test="inventory-item-price"]');
    }
    get image(): Locator {
        return this.root.getByRole('img');
    }
    get button(): Locator {
        return this.root.getByRole('button');
    }
    get imageLink(): Locator {
        return this.root.locator('a[data-test$="-img-link"]');
    }
    get titleLink(): Locator {
        return this.root.locator('a[data-test$="-title-link"]');
    }

    //** GET DATA METHODS */
    async getId(sourceLink: 'title' | 'image' = 'title'): Promise<string> {
        const targetLink = (sourceLink === 'image') ? this.imageLink : this.titleLink;
        const dataTestAttr = await targetLink.getAttribute('data-test');
        return dataTestAttr?.split('-')[1] || '';
    }
    async getTitleText(): Promise<string> {
        return (await this.title.textContent()) || '';
    }
    async getDescriptionText(): Promise<string> {
        return (await this.description.textContent()) || '';
    }
    async getImageSource(): Promise<string> {
        return (await this.image.getAttribute('src')) || '';
    }
    async getPriceValue(): Promise<number | null> {
        const priceText = (await this.price.textContent()) || ''; 
        return priceText ? parseFloat(priceText.replace('$', '')) : null;
    }
    async getButtonText(): Promise<string> {
        return (await this.button.textContent()) || '';
    }

    //** INTERACTION METHODS */
    async clickAddButton(): Promise<void> {
        await this.button.getByText("Add to cart").click();
    }
    async clickRemoveButton(): Promise<void> {
        await this.button.getByText("Remove").click();
    }
    async clickImageLink(): Promise<void> {
        await this.imageLink.click();
    }
    async clickTitleLink(): Promise<void> {
        await this.titleLink.click();
    }
    

}