const puppeteer = require("puppeteer");

const username = "devki";
const password = "password";

let browser = null;
let page = null;

(async () => {
  browser = await puppeteer.launch({ headless: false });

  page = await browser.newPage();
  page.setViewport({
    width: 1280,
    height: 500,
    isMobile: false,
  });

  await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

  // Wait for the username input field and type the username
  await page.waitForSelector('input[name="text"]');
  await page.type('input[name="text"]', username, { delay: 100 });

  // Find the "Next" button and click it
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('div[role="button"][tabindex="0"]');
    return buttons[3].click();
  });

  // Wait for the password input field and type the password
  await page.waitForSelector('input[name="password"]');
  await page.type('input[name="password"]', password, { delay: 100 });

  // Click the "Next" button again
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('div[role="button"][tabindex="0"]');
    return buttons[2].click();
  });

  // Pause the script so you can observe the browser
  await new Promise((resolve) => setTimeout(resolve, 10000));
})();
