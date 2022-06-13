const TrueWallet = require('../pageobjects/truewallet.page');
const Utility = require('../common/utility');

let currentDate = '';

beforeEach(function () {
    var date = new Date();
    currentDate = Utility.getDateStringCustom(date);
    
    console.log(`+---------------------------------------------------------------------------------+`);
    console.log(`| Starting execution of Test Id: ${currentDate}                                   |`);                            
    console.log(`+---------------------------------------------------------------------------------+`);

    TrueWallet.open();
    browser.deleteCookies();
    Utility.sleep(2000);
});

afterEach(function () {
    browser.saveScreenshot(`./test/results/photos/screenshot${currentDate}.png`);
});

describe('My TrueAge application - Happy Scenarios', () => {

    it('should do the happy path on website', async () => {
        await TrueWallet.clickGetStarted();
        var emailAddress = Utility.getGenericEmailAddress(currentDate);
        await TrueWallet.fillEmailAddress(emailAddress);
        await Utility.sleep(2000);
        await TrueWallet.clickNext();
        await TrueWallet.searchTextOnPage('Great');
        await TrueWallet.clickNext();
        await TrueWallet.searchTextOnPage('Make sure');
        await TrueWallet.clickScanDocument();
        await TrueWallet.searchTextOnPage('Scan barcode on the back of license');
        await TrueWallet.uploadDriverLicense('scenarios//photos//barcode-202206.jpg');
        await TrueWallet.searchTextOnPage('Looks good');
        await TrueWallet.clickNext();
        await Utility.sleep(1000);
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
        
        var emailAddress = 'rdrg.furlan@gmail.com';

        await TrueWallet.clickGetStarted();
        await TrueWallet.fillEmailAddress(emailAddress);
        await Utility.sleep(2000);
        await TrueWallet.searchTextOnPage('already in use');
    });   

    it('should return a error when document is invalid', async () => {
        
        var emailAddress = Utility.getGenericEmailAddress(currentDate);

        await TrueWallet.clickGetStarted();
        await Utility.sleep(2000);
        await TrueWallet.fillEmailAddress(emailAddress);
        await Utility.sleep(2000);
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
