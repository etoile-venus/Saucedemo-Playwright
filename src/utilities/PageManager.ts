import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

export class PageManager {
    readonly loginPage: LoginPage;
    readonly homePage: HomePage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
    }
}