const puppeteer = require('puppeteer');

async function product(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const srcTxt = await page.evaluate(() => {
    const el = document.querySelector('img');
    return el ? el.src : null;
  });

  console.log(srcTxt);

  await browser.close();
}

product('https://animepahe.ru/anime/9f934bbc-8c05-cbac-51bd-7dcf42206522');
