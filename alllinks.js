const puppeteer = require('puppeteer');

async function getLinks() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://devpalwar.vercel.app/work');

  let previousHeight;
  let currentHeight = await page.evaluate('document.body.scrollHeight');

  while (previousHeight !== currentHeight) {
    previousHeight = currentHeight;
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await page.waitForTimeout(1000); // Adjust the timeout as needed
    currentHeight = await page.evaluate('document.body.scrollHeight');
  }

  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    return anchors.map(anchor => anchor.href);
  });

  console.log(links);

  await browser.close();
}

getLinks();
