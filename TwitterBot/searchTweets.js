const fs = require('fs');
const path = require('path');
const puppeteer = require("puppeteer");

const username = "tannuhu";
const password = "password@";

const desktopPath = path.join(require('os').homedir(), 'Desktop');
const filePath = path.join(desktopPath, 'tweets.txt');

const searchFor = async (searchQuery) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({
    width: 1280,
    height: 600,
    isMobile: false,
  });

  await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

  await page.waitForSelector('input[name="text"]');
  await page.type('input[name="text"]', username, { delay: 100 });

  await page.evaluate(() => {
    const buttons = document.querySelectorAll('div[role="button"][tabindex="0"]');
    buttons[2].click();
  });

  await page.waitForSelector('input[name="password"]');
  await page.type('input[name="password"]', password, { delay: 100 });

  await page.evaluate(() => {
    const buttons = document.querySelectorAll('div[role="button"][tabindex="0"]');
    buttons[2].click();
  });

  await page.waitForNavigation({ waitUntil: "networkidle2" });

  const page2 = await browser.newPage();
  await page2.goto("https://twitter.com/explore", { waitUntil: "networkidle2" });

  await page2.waitForSelector('input[data-testid="SearchBox_Search_Input"]');
  await page2.type('input[data-testid="SearchBox_Search_Input"]', searchQuery, { delay: 25 });
  await page2.keyboard.press('Enter');

  await page2.waitForTimeout(5000); // Wait for tweets to load

  const tweets = await page2.evaluate(() => {
    const tweetElements = Array.from(document.querySelectorAll('div[data-testid="cellInnerDiv"]'));
    return tweetElements.map((element) => element.textContent);
  });

  fs.writeFile(filePath, tweets.join('\n'), { flag: 'a+' }, err => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Tweets saved to file.');
    }
  });

  await browser.close();

  setTimeout(runScript, 20000); // Run every 20 seconds
};

searchFor('freelancers');
