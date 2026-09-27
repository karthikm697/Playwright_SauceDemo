import{Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page'


export class HomePage extends BasePage{
    //LOCATOR
    readonly locatorUsernameInput : Locator
    readonly locatorPasswordInput : Locator
    readonly locatorLoginButton : Locator
    readonly locatorAlertError : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorUsernameInput = page.getByTestId('username')
        this.locatorPasswordInput = page.getByTestId('password')
        this.locatorLoginButton = page.getByTestId('login-button')
        this.locatorAlertError = page.getByTestId('error')
    }

    async expectLoginPage(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/')
    }

    async fillLoginForm(user:string,password:string) {
            await this.locatorUsernameInput.fill(user);
            await this.locatorPasswordInput.fill(password);
    }

    async loginWithoutUsername(password:string) {
        await this.locatorPasswordInput.fill(password);
    }

    async loginWithoutPassword(user:string) {
        await this.locatorUsernameInput.fill(user);
    }

    async clickLoginButton(){
        await this.locatorLoginButton.click();
    }
}