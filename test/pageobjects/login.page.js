

const { default: $ } = require('webdriverio/build/commands/browser/$');
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnGetStarted(){
        return $('//*[@id="app"]/div/div/div/div/div/div/div[2]/div/button/span[2]/span/span');
    }


    get inputUsername () {
        return $('#username');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        const element = $('button[type="submit"]');
        console.log(element)
        return element;
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async clickGetStarted () {
        await this.btnGetStarted.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('dev');
    }
}

module.exports = new LoginPage();
