const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function product(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    await page.waitForSelector("img", { timeout: 60000 });

    const imageUrls = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("img"));
      return images.map((img) => img.src);
    });

    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const page2 = await browser.newPage();
      await page2.goto(imageUrl);
      const base64String = await page2.evaluate(() => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = document.querySelector("img");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        return canvas
          .toDataURL()
          .replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
      });

      // Decode the base64 string into binary data
      const binaryData = Buffer.from(base64String, "base64");

      // Write the binary data to a file
      fs.writeFileSync(path.join(__dirname, `image_${i}.png`), binaryData);

      console.log(`Image ${i} saved!`);
    }

    await browser.close();
  } catch (error) {
    console.log("Achha bhai ab mai chalta hu");
  }
}

product(
  "https://www.google.com/search?q=luffy+images&tbm=isch&ved=2ahUKEwiV7d608YGCAxXT5TgGHfZECZ8Q2-cCegQIABAA&oq=luffy+images&gs_lcp=CgNpbWcQAzIECCMQJzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCCMQ6gIQJzoHCAAQigUQQzoLCAAQgAQQsQMQgwE6CAgAELEDEIMBOggIABCABBCxAzoNCAAQigUQsQMQgwEQQzoECAAQA1ChB1jNMGDCMmgBcAB4AYABhAOIAYIZkgEHMC4zLjUuNJgBAKABAaoBC2d3cy13aXotaW1nsAEKwAEB&sclient=img&ei=pAIxZZWLM9PL4-EP9oml-Ak&bih=670&biw=1408&client=firefox-b-d"
);
