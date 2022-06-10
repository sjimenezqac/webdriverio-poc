
    // it('should open the browser and navigate to website', async () => {
    //     TrueAge.open();
    //     expect(browser).toHaveUrl(`https://wallet.pilot.truage.dev/`);
    //     expect(browser).toHaveTitle(`TruAge™ Wallet`);
    // });

    // it('should start the process on Get Started', async () => {
    //     await $(getStartedButton).waitForClickable({timeout: 20000, interval: 1000});
    //     await expect($(getStartedButton)).toBeExisting();
    //     await $(getStartedButton).click();
    // });

    // it('should fill the email and go to next step', async () => {
    //     var date = new Date();
    //     const emailFill = 'teste' + getDateStringCustom(date) + '@email.com';

    //     const email = $(emailField);
    //     await email.waitForExist({ timeout: 15000 });
    //     await email.waitForClickable({timeout: 20000, interval: 1000});
    //     await expect(email).toBeExisting();
    //     await email.click();
    //     await email.setValue(emailFill);
        
    //     await sleep(2000);

    //     const button = $(nextButton);
    //     await button.waitForExist({ timeout: 15000 });
    //     await button.waitForClickable({timeout: 20000, interval: 1000});
    //     await expect(button).toBeExisting();
    //     await button.click();

    //     const message = $(greatLabel);
    //     await message.waitForExist({ timeout: 30000, interval: 2000 });
    //     await expect(message).toBeExisting();
    // });

    // it('should continue the process after validations - Great!', async () => {
    //     await sleep(2000);
    //     const button = $(nextButton);
    //     await button.waitForExist({ timeout: 15000 });
    //     await button.waitForClickable({timeout: 20000, interval: 1000});
    //     await expect(button).toBeExisting();
    //     await button.click();
    // });

    // it('should move to scan page', async () => {
    //     await sleep(2000);
    //     const button = $(scanDocumentButton);
    //     await button.waitForExist({ timeout: 20000, interval: 2000 });
    //     await button.waitForClickable({timeout: 20000, interval: 1000});
    //     await expect(button).toBeExisting();
    //     await button.click();
    // });

    // it('should click on upload document', async () => {

    //     const message = $(scanBarcodeLabel);
    //     await message.waitForExist({ timeout: 30000, interval: 2000 });
    //     await expect(message).toBeExisting();
    //     await sleep(5000);
    //     const button = $(uploadDocumentInput);
    //     await button.waitForExist({ timeout: 20000, interval: 2000 });
    //     await expect(button).toBeExisting();
    //     await button.setValue("C:\\Users\\rfits\\OneDrive - QA Consultants\\Customer\\Digital Bazaar\\barcode-expires-june-615945409.jpg");
    // });