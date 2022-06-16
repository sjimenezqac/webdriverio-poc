const Page = require('./page');
const BrowserElements = require('../common/browser.elements');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TrueWallet extends Page {
    /**
     * define selectors using getter methods
     */
    get btnLogInMain(){
        return $(`//button[@type='button']//*[text()='Log in']`);
    }
    get btnLogIn(){
        return $(`//button[@type='button']//*[text()='Login']`);
    }
    get btnVerify(){
        return $(`//button[@type='button']//*[text()='Verify']`);
    }
    get btnGetStarted(){
        return $(`//button[@type='button']//*[text()='Get Started']`);
    }
    get btnNext(){
        return $(`button=Next`);
    }
    get btnScan(){
        return $(`//button[@type='button']//*[text()='Scan']`);
    }
    get btnTakePhoto(){
        return $(`//button[@type='button']//*[text()='Take Photo']`);
    }
    get btnSave(){
        return $(`//button[@type='button']//*[text()='Save']`);
    }
    get inputEmailAddress(){
        return $(`//input[@type='email']`);
    }
    get inputFileDocument(){
        return $(`//input[@type='file']`);
    }
    get inputTextGeneric(){
        return $(`//input[@type='text']`);
    }
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */  
     async clickWithNoValidation (buttonLabel) {
        await $(`button=${buttonLabel}`).click();
    }

    async clickLogInMain () {
        let element = await this.btnLogInMain;
        BrowserElements.elementClick(element);
    }

    async clickLogIn () {
        let element = await this.btnLogIn;
        BrowserElements.elementClick(element);
    }
    async clickVerify () {
        let element = await this.btnVerify;
        BrowserElements.elementClick(element);
    }

    async clickGetStarted () {
        let element = await this.btnGetStarted;
        BrowserElements.elementClick(element);
    }

    async clickNext () {
        let element = await this.btnNext;
        BrowserElements.elementClick(element);
    }

    async clickScanDocument () {
        let element = await this.btnScan;
        BrowserElements.elementClick(element);
    }

    async clickTakePhoto () {
        let element = await this.btnTakePhoto;
        BrowserElements.elementClick(element);
    }
    
    async clickSave () {
        let element = await this.btnSave;
        BrowserElements.elementClick(element);
    }

    async searchTextOnPage(message){
        const element = $(`//*[text()[contains(.,'${message}')]]`);
        await BrowserElements.searchTextOnPage(element);
    }

    async fillEmailAddress(emailAddress){
        let element = await this.inputEmailAddress;
        BrowserElements.elementSetValue(element, emailAddress);
    }

    async uploadDriverLicense(imagePath){
        let element = await this.inputFileDocument;
        BrowserElements.uploadImage(element, imagePath);
    }

    async uploadPhoto(imagePath){
        let element = await this.inputFileDocument;
        BrowserElements.uploadImage(element, imagePath);
    }

    async fillGenericInputField(value){
        let element = await this.inputTextGeneric;
        BrowserElements.elementSetValue(element, value);
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

    async uploadImage(element, imagePath){
        const path = require('path');
        var str = __dirname;
        str = str.replace('pageobjects', '');
        const filePath = path.join(str, imagePath);
        await BrowserElements.enableInputField(element);

        await element.setValue(filePath);
        // const remoteFilePath = await browser.uploadFile(filePath);
        //await element.setValue(remoteFilePath);
    }
}

module.exports = new TrueWallet();
