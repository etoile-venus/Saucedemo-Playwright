import { Page, Locator} from "@playwright/test";
import { ROUTES } from "../data/routes";
import { MenuComponent } from "../components/MenuComponent";

export abstract class BasePage {
    protected readonly page: Page;
    get menu(): MenuComponent { return new MenuComponent(this.page); }
    abstract get url(): string;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(): Promise<void> {
        await this.page.goto(this.url);
        await this.waitForPageToLoad();
    }

    abstract waitForPageToLoad(): Promise<void>;

    
}