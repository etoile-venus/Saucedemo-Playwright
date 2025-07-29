import { test } from '@playwright/test';
import { ROUTES } from '../../src/data/routes';

export const testWithCookie = test.extend({
  page: async ({ page }, use) => {
    // Setuješ cookie ručno (primer za saucedemo)
    await page.context().addCookies([{
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'Lax',
    }]);

    await page.goto(ROUTES.BASE_URL+ROUTES.HOME);
    await use(page);
  },
});
