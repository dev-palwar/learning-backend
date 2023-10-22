const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const searchFor = async (searchQuery) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({
    width: 1280,
    height: 600,
    isMobile: false,
  });

  await page.goto("https://animepahe.ru/", { waitUntil: "networkidle2" });

  await page.waitForSelector('input[name="q"]');
  await page.type('input[name="q"]', searchQuery, { delay: 100 });

  await page.waitForSelector('li[data-index="0"] a');
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(2000); // Waits for 2 second
  await page.keyboard.press("Enter");

  await page.waitForSelector('a[class="play"]');
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[class="play"]'));
    return anchors.map((anchor) => anchor.href);
  });

  console.log(links[0]);

  const page2 = await browser.newPage();
  page2.goto(links[0]);

  await page2.waitForSelector('a[id="downloadMenu"]');
  const downloadLink = await page2.evaluate(() => {
    document.querySelector('a[id="downloadMenu"]').click();
    return document.querySelector("#pickDownload a").href;
  });

  const page3 = await browser.newPage();
  page3.goto(downloadLink);

  await page3.waitForSelector('a[rel="nofollow"]');

  const directLink = await page3.evaluate(() => {
    return document.querySelector('a[rel="nofollow"]').href;
  });

  console.log(directLink);
  const page4 = await browser.newPage();
  await page4.goto(directLink);

  page4.on("request", async (request) => {
    const url = request.url();
    if (url.includes("https://eu-09.files.nextcdn.org/get")) {
      console.log("Downloading...");
      const downloadFolder = path.join(__dirname, "download");
      if (!fs.existsSync(downloadFolder)) {
        fs.mkdirSync(downloadFolder);
      }
      const filePath = path.join(downloadFolder, "downloaded_video.mp4");
      const buffer = await (await fetch(request.url())).buffer();
      fs.writeFileSync(filePath, buffer);
      console.log("Downloading finished 🎉");
    }
  });

  await page4.waitForSelector('button[type="submit"]');
  await page4.evaluate(() => {
    document.querySelector('button[type="submit"]').click();
  });

  await page4.waitForTimeout(5000);
  await browser.close();
};

searchFor("Banana fish");
