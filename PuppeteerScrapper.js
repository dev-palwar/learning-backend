const puppeteer = require("puppeteer");

async function product(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const [el] = await page.$x("/html/body/div/div/div/div[2]/img");
  const src = el.getProperty("src");
  const srcTxt = (await src).jsonValue();
  
  console.log(srcTxt);
}

product("https://devpalwar.vercel.app/");
