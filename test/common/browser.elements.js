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
        console.log(element);
        await browser.execute(
            (el) => el.style.display = 'block',
            element
        );
        console.log(element);
        await element.waitForDisplayed();
    }
    
    async uploadImage(element, imagePath){
        const path = require('path');
        var str = './/test';
        const filePath = path.join(str, imagePath);
        const remoteFilePath = await browser.uploadFile(filePath);

        await this.enableInputField(element);
        await element.setValue(remoteFilePath);
    }
}

module.exports = new BrowserElements();
