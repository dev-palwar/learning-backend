const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadFile = async () => {
    const downloadFolder = path.join(require('os').homedir(), 'Desktop');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://kwik.cx/f/wGRvOjJTW96R', { waitUntil: 'networkidle2' });

    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    console.log('Downloading...');

    const url = 'https://eu-11.files.nextcdn.org/get/11/06/d3c5c0a9c6212afaaf56889d4a4847650ce2e6c982d91c7db2b447b69d2fcae7?file=AnimePahe_Banana_Fish_-_01_BD_360p_MTBB.mp4&token=kAOTHqM0aVQlwjSX4pfN6Q&expires=1697980134';
    const filePath = path.join(downloadFolder, 'downloaded_video.mp4');

    const writer = fs.createWriteStream(filePath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            console.log('Downloading finished 🎉');
            browser.close();
            resolve();
        });
        writer.on('error', reject);
    });
};

downloadFile();
