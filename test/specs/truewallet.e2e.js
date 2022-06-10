const TrueWallet = require('../pageobjects/truewallet.page');

let currentDate = '';

beforeEach(function () {
    var date = new Date();
    currentDate = getDateStringCustom(date);
    
    console.log(`+---------------------------------------------------------------------------------+`);
    console.log(`| Starting execution of Test Id: ${currentDate}                                   |`);                            
    console.log(`+---------------------------------------------------------------------------------+`);

    TrueWallet.open();
    browser.deleteCookies();
    sleep(2000);
});

afterEach(function () {
    browser.saveScreenshot(`./test/scenarios/photos/screenshot${currentDate}.png`);
});

describe('My TrueAge application - Happy Scenarios', () => {

    it('should do the happy path on website', async () => {

        await TrueWallet.clickGetStarted();
        var emailAddress = getGenericEmailAddress();
        await TrueWallet.fillEmailAddress(emailAddress);
        await sleep(2000);
        await TrueWallet.clickNext();
        await TrueWallet.searchTextOnPage('Great');
        await TrueWallet.clickNext();
        await TrueWallet.searchTextOnPage('Make sure');
        await TrueWallet.clickScanDocument();
        await TrueWallet.searchTextOnPage('Scan barcode on the back of license');
        await TrueWallet.uploadDriverLicense('scenarios//photos//barcode-202206.jpg');
        await TrueWallet.searchTextOnPage('Looks good');
        await TrueWallet.clickNext();
        await sleep(1000);
        await TrueWallet.uploadPhoto('scenarios//photos//Thor.png');
        await TrueWallet.searchTextOnPage('Looks good');
        await TrueWallet.clickNext();
        await TrueWallet.searchTextOnPage('Your TruAge');
        await TrueWallet.clickNext();
        await TrueWallet.searchTextOnPage('Congratulations');
        await TrueWallet.clickSave();
        await TrueWallet.searchTextOnPage('Welcome to TruAge');
        await TrueWallet.searchTextOnPage('Over 21');
    }); 
});

describe('My TrueAge application - Negative Scenarios', () => {

    // it('should return an error message when email is invalid', async () => {
    //     await TrueWallet.clickGetStarted();
    //     var emailAddress = 'invalidEmail.com';
    //     await TrueWallet.fillEmailAddress(emailAddress);
    //     await sleep(2000);
    //     await TrueWallet.searchTextOnPage('Please enter a valid email address');
    // });

    it('should return an error message when email is already in use', async () => {
        await TrueWallet.clickGetStarted();
        var emailAddress = 'rdrg.furlan@gmail.com';
        await TrueWallet.fillEmailAddress(emailAddress);
        await sleep(2000);
        await TrueWallet.searchTextOnPage('already in use');
    });   

    it('should return a error when document is invalid', async () => {
        await TrueWallet.clickGetStarted();
        await sleep(2000);
        var emailAddress = getGenericEmailAddress();
        await TrueWallet.fillEmailAddress(emailAddress);
        await sleep(2000);
        await TrueWallet.clickNext();
        await TrueWallet.searchTextOnPage('Great');
        await TrueWallet.clickNext();
        await TrueWallet.searchTextOnPage('Make sure');
        await TrueWallet.clickScanDocument();
        await TrueWallet.searchTextOnPage('Scan barcode on the back of license');
        await TrueWallet.uploadDriverLicense('scenarios//photos//Thor.png');
        await TrueWallet.searchTextOnPage('Scan Failure');
    });   
});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

function getGenericEmailAddress() {
    // var date = new Date();
    // this.currentDate = getDateStringCustom(date);
    return `teste${currentDate}@email.com`;
}

function getDateStringCustom(oDate) {
    var sDate;
    if (oDate instanceof Date) {
        sDate = oDate.getYear() + 1900
            + ((oDate.getMonth() + 1 < 10) ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1)
            + ((oDate.getDay() < 10) ? '0' + (oDate.getDay()) : oDate.getDay())
            + ((oDate.getHours() < 10) ? '0' + (oDate.getHours()) : oDate.getHours())
            + ((oDate.getMinutes() < 10) ? '0' + (oDate.getMinutes()) : oDate.getMinutes())
            + ((oDate.getSeconds() < 10) ? '0' + (oDate.getSeconds()) : oDate.getSeconds());
    } else {
        throw new Error("oDate is not an instance of Date");
    }
    return sDate;
}
