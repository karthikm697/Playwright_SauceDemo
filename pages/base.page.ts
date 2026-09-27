import { Page, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo(url:string){
        await this.page.goto(url);
    }

    async waitFor() {
        await this.page.waitForTimeout(500);
    }

    async screenshot(screenshotName:string){
        await this.page.screenshot({
            path: `./tests/tests_visual/screenshots/${screenshotName}.png`,
            fullPage: true,
        });
    }

    async expectScreenshot(screenshotName:string){
        await expect.soft(this.page).toHaveScreenshot(`${screenshotName}.png`, { fullPage: true });
  }
}
