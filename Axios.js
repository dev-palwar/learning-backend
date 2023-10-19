const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://devpalwar.vercel.app/';

axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    $('h1').each((index, element) => {
      console.log($(element).text());
    });
  })
  .catch(error => {
    console.log(error);
  });
