import { Locator, Page } from "@playwright/test";
import { ROUTES } from "../data/routes";
import { BasePage } from "./BasePage";

export class ItemPage extends BasePage {
    get url(): string { return ROUTES.BASE_URL + ROUTES.ITEM; }
    
    get backToProducts(): Locator { return this.page.getByRole('button', { name: 'back to' }); }
    get image(): Locator { return this.page.locator('img[data-test$="-img"]'); }
    get title(): Locator { return this.page.locator('[data-test="inventory-item-name"]'); }
    get description(): Locator { return this.page.locator('[data-test="inventory-item-desc"]'); }
    get price(): Locator { return this.page.locator('[data-test="inventory-item-price"]'); }
    get button(): Locator { return this.page.locator('.inventory_details_desc_container').getByRole('button'); }
    get addButton(): Locator { return this.page.getByRole('button', { name: 'add' }); }
    get removeButton(): Locator { return this.page.getByRole('button', { name: 'remove' }); }

    constructor(page: Page) {
        super(page);
    }

    async waitForPageToLoad(): Promise<void> {
        this.price.waitFor({ state: 'visible' })
    }

    

}