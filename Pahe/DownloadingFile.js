const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

async function downloadFile(url, filePath) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  fs.writeFileSync(filePath, buffer);
  console.log("File downloaded successfully. 🎉");
}

async function product(url) {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  await page.goto(url);

  page.on("response", async (response) => {
    if (response.url().startsWith("https://eu-99.files.nextcdn.org/get/")) {
      const url = response.url();
      const filePath = "./downloads/file.mp4";
      console.log("Downloading...");
      await downloadFile(url, filePath);
    }
  });

  const searchResultSelector = "button";
  await page.waitForSelector(searchResultSelector, { visible: true });

  await page.click(searchResultSelector);

  await browser.close();
}

product("https://www.pagalworld.pw/kalaastar-from-honey-30-mp3-song/download.html");