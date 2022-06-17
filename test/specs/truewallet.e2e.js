const TrueWallet = require('../pageobjects/truewallet.page');
const Utility = require('../common/utility');
const MailReader = require('../mail/gmail/process');

let currentDate = '';

beforeEach(function () {
    currentDate = '';
    var date = new Date();
    currentDate = Utility.getDateStringCustom(date);
    
    console.log(`- Starting execution of Test Id: ${currentDate}`);

    TrueWallet.open();
    browser.deleteCookies();
    Utility.sleep(2000);
});

afterEach(function () {
    browser.saveScreenshot(`./test/results/photos/screenshot${currentDate}.png`);
});

describe('My TrueAge application - Happy Scenarios', () => {

    it.skip('should do the happy path on website', async () => {
        var emailAddress = Utility.getGenericEmailAddress(currentDate);
        await TrueWallet.clickGetStarted();
        await TrueWallet.fillEmailAddress(emailAddress);
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
    
    it.skip('should test the Google API', async () => {
        var emailAddress = process.env.CLIENT_MAIL;
        await TrueWallet.clickLogInMain();
        await TrueWallet.fillEmailAddress(emailAddress);
        await Utility.sleep(5000);
        await TrueWallet.clickLogIn();
        await Utility.sleep(20000);
        const verificationCode = await MailReader.readMail();
        await TrueWallet.fillGenericInputField(verificationCode);
        await Utility.sleep(1000);
        await TrueWallet.clickVerify();
        await TrueWallet.searchTextOnPage('Welcome to TruAge');
        await TrueWallet.searchTextOnPage('Over 21');
    });   
});

describe('My TrueAge application - Negative Scenarios', () => {

    it.skip('should return an error message when email is invalid', async () => {
        
        var emailAddress = 'invalidEmail.com';

        await TrueWallet.clickGetStarted();
        await TrueWallet.fillEmailAddress(emailAddress);
        await Utility.sleep(2000);
        await TrueWallet.clickWithNoValidation('Next');
        await TrueWallet.searchTextOnPage('Please enter a valid email address');
    });

    it.skip('should return an error message when email is already in use', async () => {
        
        var emailAddress = 'rdrg.furlan@gmail.com';

        await TrueWallet.clickGetStarted();
        await TrueWallet.fillEmailAddress(emailAddress);
        await TrueWallet.searchTextOnPage('already in use');
    });   

    it.skip('should return a error when document is invalid', async () => {
        
        var emailAddress = Utility.getGenericEmailAddress(currentDate);

        await TrueWallet.clickGetStarted();
        // await Utility.sleep(500);
        await TrueWallet.fillEmailAddress(emailAddress);
        // await Utility.sleep(2000);
        await TrueWallet.clickNext();
        await TrueWallet.searchTextOnPage('Great');
        await TrueWallet.clickNext();
        await TrueWallet.searchTextOnPage('Make sure');
        await TrueWallet.clickScanDocument();
        await TrueWallet.searchTextOnPage('Scan barcode on the back of license');
        await TrueWallet.uploadDriverLicense('scenarios//photos//Thor.png');
        await TrueWallet.searchTextOnPage('Scan Failure');
    });  

    it('should return an error when try to insert an invalid verify code', async () => {
        var emailAddress = process.env.CLIENT_MAIL;
        await TrueWallet.clickLogInMain();
        await TrueWallet.fillEmailAddress(emailAddress);
        await Utility.sleep(5000);
        await TrueWallet.clickLogIn();
        await Utility.sleep(2000);
        const verificationCode = '123123';
        await TrueWallet.fillGenericInputField(verificationCode);
        await Utility.sleep(1000);
        await TrueWallet.clickVerify();
        await TrueWallet.searchTextOnPage('There was a problem');        
    });   
});
