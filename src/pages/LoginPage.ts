import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage"
import { ROUTES } from "../data/routes";

export class LoginPage extends BasePage {
    get url(): string { return ROUTES.BASE_URL + ROUTES.LOGIN; }
    
    get username(): Locator { return this.page.getByPlaceholder("Username"); }
    get password(): Locator { return this.page.getByPlaceholder("Password"); }
    get loginButton(): Locator { return this.page.getByRole("button", { name: "Login" }); }
    get error(): Locator { return this.page.locator("h3[data-test='error']"); }

    constructor(page: Page) {
        super(page);
    }
    
    async waitForPageToLoad(): Promise<void> {
        await this.loginButton.waitFor({ state: 'visible' });
    }

    async login(username: string, password: string) {
        // .fill() function first clears any input and then enters given string
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async closeError() {
        await this.error.getByRole("button").click();
    }
}