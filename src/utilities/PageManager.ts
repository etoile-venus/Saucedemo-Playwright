import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ItemPage } from '../pages/ItemPage';

export class PageManager {
    readonly loginPage: LoginPage;
    readonly homePage: HomePage;
    readonly itemPage: ItemPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.itemPage = new ItemPage(page);
    }
}