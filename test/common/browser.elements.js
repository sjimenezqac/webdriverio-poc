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
        await element.waitForExist({ timeout: 60000, interval: 2000 });
        await expect(element).toBeExisting();
    }
    
    async enableInputField(element){
        await element.waitForExist({ timeout: 15000 });
        await browser.execute(
            (el) => el.style.display = 'block',
            element
        );
        await element.waitForDisplayed();
    }
    
    async uploadImage(element, imagePath){
        await this.enableInputField(element);

        const path = require('path');
        var str = __dirname.replace('common','');
        const filePath = path.join(str, imagePath);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(browser.capabilities.browserName);
        if (browser.capabilities.browserName == 'chrome'){
            const remoteFilePath = await browser.uploadFile(filePath);
            await element.setValue(remoteFilePath);
        } else {
            await element.setValue(filePath);
        }
    }
}

module.exports = new BrowserElements();
