# SauceDemo Playwright Automation (WIP)

*GitHub* - [etoile-venus/Saucedemo-Playwright](https://github.com/etoile-venus/Saucedemo-Playwright)

This project is a practice UI automation framework for the SauceDemo website using Playwright. It’s an exercise to expand my automation skills beyond Selenium and explore Playwright’s modern testing capabilities.


---

## Technologies

![Playwright](https://img.shields.io/badge/Playwright-45B05C?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## Project Setup

1.  **Prerequisites:**
    * **Node.js:** Latest stable LTS version.
    * **Git:** For cloning the repository.
    * A code editor like **Visual Studio Code** (recommended).

2.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/etoile-venus/Saucedemo-Playwright.git](https://github.com/etoile-venus/Saucedemo-Playwright.git)
    cd Saucedemo-Playwright
    ```

3.  **Install Dependencies:**
    Navigate to the project's root directory and install all necessary Playwright dependencies:

    ```bash
    npm install
    npx playwright install # Installs browser binaries
    ```

---
## Project Structure

```bash
Saucedemo-Playwright
├── src
│   ├── components
│   │   ├── ItemComponent.ts
│   │   └── MenuComponent.ts
│   ├── data
│   │   ├── routes.ts
│   │   └── providers
│   │       ├── QuantityProvider.ts
│   │       ├── SortCasesProvider.ts
│   │       └── UsersProvider.ts
│   ├── pages
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── ItemPage.ts
│   │   └── LoginPage.ts
│   └── utilities
│       ├── Interfaces.ts
│       ├── PageManager.ts
│       └── Types.ts
├── tests
│   ├── home.spec.ts
│   ├── login.spec.ts
│   └── fixtures
│       └── testWithCookie.ts
```
---
## How to Run Tests (Currently Under Development)
After setting up the project, you can run the tests using the following commands:

- Run all tests in headless mode:
  ```
  npx playwright test
  ```

- Run tests in headed mode:
  ```
  npx playwright test --headed
  ```

- Launch Playwright's interactive Test UI:
  ```
  npx playwright test --ui
  ```

---

## License

This project is open-source and freely available for use, modification, and distribution without restrictions.

## Author
**Danica Bijeljanin**

Feel free to connect with me:
- **LinkedIn:** [linkedin.com/in/danicabijeljanin/](https://linkedin.com/in/danicabijeljanin/)  
- **GitHub:** [github.com/etoile-venus](https://github.com/etoile-venus)

