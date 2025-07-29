import { Page, Locator } from '@playwright/test'

export class MenuComponent {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    get cartIcon(): Locator {
        return this.page.locator('a[data-test="shopping-cart-link"]');
    }
    get menuOpenButton(): Locator {
        return this.page.getByRole('button', { name: 'Open Menu' });
    }
    get menuCloseButton(): Locator {
        return this.page.getByRole('button', { name: 'Close Menu' });
    }
    get logoutButton(): Locator {
          return this.page.locator('a[data-test="logout-sidebar-link"]');
    }

    async openCartPage(): Promise<void> {
        await this.cartIcon.click();
    }
    async getCartItemNumber(): Promise<number> {
        let text = await this.cartIcon.textContent();
        return parseInt(text || '0');
    }

    async open(): Promise<void>{
        await this.menuOpenButton.click();
    }
    async close(): Promise<void>{
        await this.menuCloseButton.click();
    }

    async menuClickOnAllItems(): Promise<void> {
        await this.page.getByRole('link', { name: 'All items'}).click();
    }
    async menuClickOnAbout(): Promise<void> {
        await this.page.getByRole('link', { name: 'About'}).click();
    }
    async menuClickOnLogout(): Promise<void> {
        await this.logoutButton.click();
    }
    async menuClickOnResetAppState(): Promise<void> {
        await this.page.getByRole('link', { name: 'Reset App State'}).click();
    }

}