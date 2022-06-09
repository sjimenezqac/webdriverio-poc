        /*
        private static String GET_STARTED = "//button[@type=\"button\"]//*[text() = 'Get Started']";
        private static String INSTALL_APP = "//button[@type=\"button\"]//*[text() = 'Install App']";
        private static String CONTINUE = "//button[@type=\"button\"]//*[text()=\"Continue\"]";
        private static String NEXT_SCREEN = "//button[@type=\"button\"]//*[text()=\"Next\"]";
        private static String LABEL_EMAIL = "//input[@type=\"email\"]";
        private static String SCAN_DOCUMENT = "//button[@type=\"button\"]//*[text()=\"Scan\"]";
        private static String UPLOAD_FILE = "//input[@type=\"file\"]";
        private static String TAKE_PHOTO = "//button[@type=\"button\"]//*[text()=\"Take Photo\"]";
        private static String SAVE = "//button[@type=\"button\"]//*[text()=\"Save\"]";
        private static String SHOW_ID = "//button[@type=\"button\"]//*[text()=\"Show ID\"]";
        */

describe('My TrueAge application - Happy Path', () => {

    // Buttons
    const getStartedButton = '//button[@type="button"]//*[text()="Get Started"]';
    const nextButton = '//button[@type="button"]//*[text()="Next"]';

    // Fields
    const emailField = '//input[@type="email"]';

    // Labels
    const getStartedLabel = `Set up your TruAge`;
    const emailLabel = `Let's create your TruAge`;
    const greatLabel = `Great`;


    it('should open the browser and navigate to website', async () => {
        browser.deleteCookies();
        browser.url(`https://wallet.pilot.truage.dev`);
        browser.pause(2000);
        expect(browser).toHaveUrl(`https://wallet.pilot.truage.dev/`);
        expect(browser).toHaveTitle(`TruAge™ Wallet`);
    });

    it('should start the  on Get Started', async () => {
        expect($(`*=${getStartedLabel}`)).toExist();
        const getStartedElement = await $(getStartedButton);
        await expect(getStartedElement).toBeExisting();
        await getStartedElement.click();
    });

    it('should fill the email and go to next step', async () => {
        expect($(`*=${emailLabel}`)).toExist();
        const emailElement = await $(emailField);
        await expect(emailElement).toBeClickable();
        
        var date = new Date();
        emailElement.setValue('teste' + getDateStringCustom(date) + '@email.com');
        
        await sleep(1000);

        const nextElement = await $(nextButton);
        await expect(nextElement).toBeClickable();
        await nextElement.click();
    });

    it('should create a user with the email provided', async () => {

        browser.waitUntil(() => {
            return $(`*=${greatLabel}`).isDisplayed();
        }, {
            timeout: 30000,
            interval: 1000,
            timeoutMsg: 'Expected text to be founded after 30s'
        });

        console.log("*************************************************************************************");

        // expect($(`*=${creatingProfileLabel}`)).toExist();
        // expect($(`*=${greatLabel}`)).toExist();

        const nextElement = await $(nextButton);
        expect(nextElement).toBeClickable();
        await nextElement.click();
    });



    
    it('ALL', async () => {
        console.log('It is over dude... Get the current xPath needed...');
        await sleep(50000);
        // const elem = await $('header').$('h1*=Welcome')

        /*
        private static String GET_STARTED = "//button[@type=\"button\"]//*[text() = 'Get Started']";
        private static String INSTALL_APP = "//button[@type=\"button\"]//*[text() = 'Install App']";
        private static String CONTINUE = "//button[@type=\"button\"]//*[text()=\"Continue\"]";
        private static String NEXT_SCREEN = "//button[@type=\"button\"]//*[text()=\"Next\"]";
        private static String LABEL_EMAIL = "//input[@type=\"email\"]";
        private static String SCAN_DOCUMENT = "//button[@type=\"button\"]//*[text()=\"Scan\"]";
        private static String UPLOAD_FILE = "//input[@type=\"file\"]";
        private static String TAKE_PHOTO = "//button[@type=\"button\"]//*[text()=\"Take Photo\"]";
        private static String SAVE = "//button[@type=\"button\"]//*[text()=\"Save\"]";
        private static String SHOW_ID = "//button[@type=\"button\"]//*[text()=\"Show ID\"]";
        */

        /*
        // Buttons
        const getStartedButton = '//button[@type="button"]//*[text()="Get Started"]';
        const nextButton = '//button[@type="button"]//*[text()="Next"]';
        const scanButton = '//button[@type="button"]//*[text()="Scan"]';

        // Text Fields
        const emailField = '//input[@type="email"]';

        const emailElement = await $(emailField);
        await expect(emailElement).toBeExisting();
        
        var date = new Date();
        emailElement.setValue('teste' + getDateStringCustom(date) + '@email.com');
        await sleep(2000);

        let nextElement = await $(nextButton);
        await expect(nextElement).toBeExisting();
        await nextElement.click();


        browser.waitUntil(() => {
            return $(nextButton).isExisting();
        }, 20000);

        console.log("3 - passou aqui...");
        

        await sleep(10000);

        nextElement = null;
        nextElement = await $(nextButton);
        await expect(nextElement).toBeExisting();
        await nextElement.click();

        const scanElement = await $(scanButton);
        await expect(scanElement).toBeExisting();
        await scanElement.click();

        await sleep(10000);


        // await LoginPage.clickGetStarted();

        // await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        // await expect(SecurePage.flashAlert).toBeExisting();
        // await expect(SecurePage.flashAlert).toHaveTextContaining(
        //     'You logged into a secure area!');
        */
    });
});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
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