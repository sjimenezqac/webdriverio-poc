class BrowserElements {

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

    async searchTextOnPage(element){
        await element.waitForExist({ timeout: 30000, interval: 2000 });
        await expect(element).toBeExisting();
    }

    // async uploadImage(browser, element, imagePath){
    //     await browser.execute(
    //         (el) => el.style.display = 'block',
    //         element
    //     );
    //     await element.waitForExist({ timeout: 15000 });
    //     await element.waitForDisplayed();
        
    //     const path = require('path');
    //     var str = __dirname;
    //     console.log(str);
    //     str = str.replace('pageobjects', '');
    //     const filePath = path.join(str, imagePath);
    //     const remoteFilePath = await browser.uploadFile(filePath);
    //     await element.setValue(remoteFilePath);
    // }
}

module.exports = new BrowserElements();
