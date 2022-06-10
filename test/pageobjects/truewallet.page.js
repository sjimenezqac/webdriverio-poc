
const { default: $ } = require('webdriverio/build/commands/browser/$');
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TrueWallet extends Page {
    /**
     * define selectors using getter methods
     */
    get btnGetStarted(){
        return browser.$(`//button[@type='button']//*[text()='Get Started']`);
    }
    get btnNext(){
        return browser.$(`//button[@type='button']//*[text()='Next']`);
    }
    get btnScan(){
        return browser.$(`//button[@type='button']//*[text()='Scan']`);
    }
    get btnTakePhoto(){
        return browser.$(`//button[@type='button']//*[text()='Take Photo']`);
    }
    get btnSave(){
        return browser.$(`//button[@type='button']//*[text()='Save']`);
    }
    get inputEmailAddress(){
        return browser.$(`//input[@type='email']`);
    }
    get inputFileDocument(){
        return browser.$(`//input[@type='file']`);
    }
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */  
    async clickGetStarted () {
        let element = await this.btnGetStarted;
        this.elementClick(element);
    }

    async clickNext () {
        let element = await this.btnNext;
        this.elementClick(element);
    }

    async clickScanDocument () {
        let element = await this.btnScan;
        this.elementClick(element);
    }

    async clickTakePhoto () {
        let element = await this.btnTakePhoto;
        this.elementClick(element);
    }
    
    async clickSave () {
        let element = await this.btnSave;
        this.elementClick(element);
    }

    async searchTextOnPage(message){
        const element = browser.$(`//*[text()[contains(.,'${message}')]]`);
        await element.waitForExist({ timeout: 30000, interval: 2000 });
        await expect(element).toBeExisting();
    }

    async fillEmailAddress(emailAddress){
        let element = await this.inputEmailAddress;
        this.elementSetValue(element, emailAddress);
    }

    async uploadDriverLicense(imagePath){
        let element = await this.inputFileDocument;
        this.uploadImage(element, imagePath);
    }

    async uploadPhoto(imagePath){
        let element = await this.inputFileDocument;
        this.uploadImage(element, imagePath);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        const element = super.open(`dev`);
        expect(browser).toHaveUrl(`https://wallet.pilot.truage.dev/`);
        expect(browser).toHaveTitle(`TruAge™ Wallet`);
        return element;
    }
    
    /**
     * a method to encapsule automation code to interact with the page
     * objects loaded
     */
    async elementClick(element){
        await element.waitForExist({ timeout: 15000 });
        await element.waitForClickable({timeout: 20000, interval: 500});
        await expect(element).toBeExisting();
        await element.click();
    }

    async elementSetValue(element, value){
        await element.waitForExist({ timeout: 15000 });
        await element.waitForClickable({timeout: 20000, interval: 1000});
        await expect(element).toBeExisting();
        await element.setValue(value);
        await element.click();
    }

    async uploadImage(element, imagePath){
        await browser.execute(
            (el) => el.style.display = 'block',
            element
        );
        await element.waitForExist({ timeout: 15000 });
        await element.waitForDisplayed();
        
        const path = require('path');
        var str = __dirname;
        str = str.replace('pageobjects', '');
        const filePath = path.join(str, imagePath);
        const remoteFilePath = await browser.uploadFile(filePath);
        await element.setValue(remoteFilePath);
    }
}

module.exports = new TrueWallet();
