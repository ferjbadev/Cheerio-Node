const cheerio = require('cheerio');
fetch = require('node-fetch');

const URL = "https://es.investing.com/crypto/";

async function main() {
  let response = await fetch(URL);
        html = await response.text();

  let $ = cheerio.load(html),      
    cryptos = [],
    crypto,
    tbody = $('tbody').find('tr').toArray();

  for(let tr of tbody){
    crypto = []
    tr = $(tr).find('td').filter((i, elem) => $(elem).text() !== '').toArray();
    for(let td of tr){
      crypto.push($(td).text())
    }
    cryptos.push(crypto)
  }
  console.table(cryptos)
}

setInterval(() => main(), 3000)