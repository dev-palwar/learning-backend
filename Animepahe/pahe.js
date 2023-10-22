const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { SingleBar, Presets } = require("cli-progress");

const downloadFolder = path.join(require("os").homedir(), "Desktop");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Please use a clear name");
rl.question(`Name your anime: `, (anime) => {
  searchFor(anime);
});

async function searchFor(searchQuery) {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    page.setViewport({
      width: 1280,
      height: 600,
      isMobile: false,
    });

    console.log(`😈 ${" "} Alright!`);
    await page.goto("https://animepahe.ru/", { waitUntil: "networkidle2" });

    await page.waitForSelector('input[name="q"]');

    console.log(`Searching...`);
    await page.type('input[name="q"]', searchQuery, { delay: 100 });
    await page.waitForTimeout(1000);

    await page.waitForSelector('li[data-index="0"] a');
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await page.waitForSelector('a[class="play"]');
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[class="play"]'));
      return anchors.map((anchor) => anchor.href);
    });

    console.log(`There are ${links.length} episodes`);
    rl.question("Which one do you want to download? ", async (episode) => {
      setTimeout(() => {
        console.log("Got it 👍");
      }, 600);

      const page2 = await browser.newPage();
      await page2.goto(links[episode - 1]);

      console.log(`Searching...`);
      // Clicks on a download button and returns the download link (Pahe Shortner)
      await page2.waitForSelector('a[id="downloadMenu"]');
      const downloadLink = await page2.evaluate(() => {
        document.querySelector('a[id="downloadMenu"]').click();
        return document.querySelector("#pickDownload a").href;
      });

      const page3 = await browser.newPage();
      await page3.goto(downloadLink);
      await page3.waitForSelector('a[rel="nofollow"]');
      await page3.waitForTimeout(6000);
      const kwiklink = await page3.evaluate(() => {
        return document.querySelector('a[rel="nofollow"]').href;
      });

      console.log(`🫡 ${""} Preparing for download...`);
      const page4 = await browser.newPage();
      await page4.goto(kwiklink, {
        waitUntil: "networkidle2",
      });

      await page4.waitForSelector('button[type="submit"]');
      await page4.evaluate(() => {
        document.querySelector('button[type="submit"]').click();
      });

      // Displaying downloading progress
      const progressBar = new SingleBar({}, Presets.shades_grey);
      let totalLength = 0;
      let currentLength = 0;

      page4.on("request", async (interceptedRequest) => {
        const url = interceptedRequest.url();
        if (url.includes("files.nextcdn.org/get")) {
          console.log(`✌️${" "} Downloading...`);
          const response = await axios({
            url,
            method: "GET",
            responseType: "stream",
          });

          const filePath = path.join(downloadFolder, "downloaded_episode.mp4");
          const writer = fs.createWriteStream(filePath);

          response.data.on("data", (chunk) => {
            currentLength += chunk.length;
            if (!totalLength) {
              totalLength = +response.headers["content-length"];
              progressBar.start(totalLength, currentLength);
            }
            progressBar.update(currentLength);
          });

          response.data.pipe(writer);

          return new Promise((resolve, reject) => {
            writer.on("finish", () => {
              console.log("Downloading finished 🎉");
              browser.close();
              progressBar.stop();
              resolve();
            });
            writer.on("error", reject);
          });
        }
      });
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
