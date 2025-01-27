const Apify = require('apify');

Apify.main(async () => {
    const input = await Apify.getInput();
    const { address } = input;

    const browser = await Apify.launchPuppeteer();
    const page = await browser.newPage();

    // Navigate to the target page
    await page.goto('https://livingatlas.arcgis.com/assessment-tool/explore/details');

    // Interact with the form
    await page.type('#address-input', address);
    await page.click('#submit-button'); // Replace with the actual button selector

    // Wait for results
    await page.waitForSelector('.results-container'); // Adjust selector as needed

    // Extract results
    const data = await page.evaluate(() => {
        return document.querySelector('.results-container').innerText; // Adjust to scrape desired content
    });

    console.log(data);

    // Save results to the dataset
    await Apify.pushData({ address, data });

    await browser.close();
});
