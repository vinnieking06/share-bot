const request = require('request');
var jsdom = require("jsdom/lib/old-api.js");
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/')); 

app.get('/start', (req, res) => {
  delayScrapeAndShare();
  res.end('it has begun');
})

var scrapeHeader = {
    'if-none-match': '"27363b17850c4f090e2609060b54181c"',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.8',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'cache-control': 'max-age=0',
    'authority': 'poshmark.com',
    'cookie': 'ps=%7B%22bid%22%3A%2259894ea5b88c56bbc77bddc4%22%7D; __ssid=27b0efe7-cfaa-4dd7-bfe8-c3c7018bdcb6; fbm_182809591793403=base_domain=.poshmark.com; hbb=true; ui=%7B%22dh%22%3A%22linseybroooke%22%2C%22uit%22%3A%22https%3A%2F%2Fgraph.facebook.com%2Fv2.6%2F10210220054437826%2Fpicture%22%2C%22uid%22%3A%2259581cec1d2f9043d0113f37%22%2C%22em%22%3A%22moenlinsey%40gmail.com%22%2C%22fn%22%3A%22Linsey+Moen%22%2C%22roles%22%3A%5B%5D%2C%22ge%22%3A%22female%22%7D; sp=%7B%22type%22%3A%22listings%22%2C%22dept%22%3A%22Women%22%7D; _web_session=BAh7CEkiD3Nlc3Npb25faWQGOgZFRkkiJWUxOGI5MjlhZThjYmQ2ODBlYzQzNDFiMTg5ZGE2MzI5BjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMUpRQWVLMXBhWjNZY2c2ZUVFSVc3REVrWDRCS2xNempIV1RISjBqcmFKb0k9BjsARkkiEWFjY2Vzc190b2tlbgY7AEZJIgGWTlRrMU9ERmpaV014WkRKbU9UQTBNMlF3TVRFelpqTTNmREUxTXpRd05qWXhORE44TUM0eWZEQjhOVGs0WldOaE5XWTBOMkl5WmpNNVpUZzJOVGRrT0RNeGZEQjhNa3gxTTFCTlptRmFjMWRUWW5VMlVuRnNORkpvU0hRNVZFWlNRMGs1UWtGcmJVcHhaekF6V1cxRVVRBjsARg%3D%3D--8b32b789586603596732824a9aa9011673deef09; mysize=complete; wba=2017-08-12T14%3A29%3A57-07%3A00; _gat=1; _gat_tracker1=1; tgprm=true; tgfd=true; tgsh=true; rt=%7B%22src%22%3A%5B%7B%22rf%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%2C%22lpu%22%3A%22%2Fcloset%2Filene_rosas%2Fabout-me%22%2C%22lpt%22%3A%22Other%22%2C%22rs%22%3A%22gs%22%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%5D%7D; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278'
};


var shareHeaders =  {
    'origin': 'https://poshmark.com',
    'accept-encoding': 'gzip, deflate, br',
    'x-csrf-token': 'JQAeK1paZ3Ycg6eEEIW7DEkX4BKlMzjHWTHJ0jraJoI=',
    'x-requested-with': 'XMLHttpRequest',
    'accept-language': 'en-US,en;q=0.8',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'accept': '*/*',
    'referer': 'https://poshmark.com/feed',
    'authority': 'poshmark.com',
    'cookie': 'ps=%7B%22bid%22%3A%2259894ea5b88c56bbc77bddc4%22%7D; __ssid=27b0efe7-cfaa-4dd7-bfe8-c3c7018bdcb6; fbm_182809591793403=base_domain=.poshmark.com; hbb=true; ui=%7B%22dh%22%3A%22linseybroooke%22%2C%22uit%22%3A%22https%3A%2F%2Fgraph.facebook.com%2Fv2.6%2F10210220054437826%2Fpicture%22%2C%22uid%22%3A%2259581cec1d2f9043d0113f37%22%2C%22em%22%3A%22moenlinsey%40gmail.com%22%2C%22fn%22%3A%22Linsey+Moen%22%2C%22roles%22%3A%5B%5D%2C%22ge%22%3A%22female%22%7D; sp=%7B%22type%22%3A%22listings%22%2C%22dept%22%3A%22Women%22%7D; _web_session=BAh7CEkiD3Nlc3Npb25faWQGOgZFRkkiJWUxOGI5MjlhZThjYmQ2ODBlYzQzNDFiMTg5ZGE2MzI5BjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMUpRQWVLMXBhWjNZY2c2ZUVFSVc3REVrWDRCS2xNempIV1RISjBqcmFKb0k9BjsARkkiEWFjY2Vzc190b2tlbgY7AEZJIgGWTlRrMU9ERmpaV014WkRKbU9UQTBNMlF3TVRFelpqTTNmREUxTXpRd05qWXhORE44TUM0eWZEQjhOVGs0WldOaE5XWTBOMkl5WmpNNVpUZzJOVGRrT0RNeGZEQjhNa3gxTTFCTlptRmFjMWRUWW5VMlVuRnNORkpvU0hRNVZFWlNRMGs1UWtGcmJVcHhaekF6V1cxRVVRBjsARg%3D%3D--8b32b789586603596732824a9aa9011673deef09; mysize=complete; wba=2017-08-12T14%3A29%3A57-07%3A00; rt=%7B%22src%22%3A%5B%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%5D%7D; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278; _gat=1; _gat_tracker1=1; tgprm=true; tgfd=true; tgsh=true',
    'content-length': '0'
};


function randomNumTo25() {
  return Math.floor((Math.random() * 25000) + 1);
}

function delay(t){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },t)
    })
}

async function delayShare(arr) {
    let random;
    for(let i of arr){
      console.log('sharing', i);
        random = randomNumTo25();
        await delay(random);
        share(i);
    }
}

function delayScrapeAndShare() {
  console.log('initiating');
  scrapeAndShare();
  setInterval(scrapeAndShare, 1320000 )
}

//delayScrapeAndShare();

function scrapeAndShare() {
  jsdom.env( {
    url:"https://poshmark.com/feed",
    headers: scrapeHeader,
    scripts:["http://code.jquery.com/jquery.js"],
    done: function (err, window) {
      const ids = window.document.getElementsByClassName('tile');
      const final = [];
      for (let i = 0; i < ids.length; i++) {
        final.push(ids[i].id);
      }
      delayShare(final);
    }
  })
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}


function share(id) {
  let options = {
    url: `https://poshmark.com/listing/share?post_id=${id}`,
    method: 'POST',
    headers: shareHeaders
  };
  return request(options, callback)
}

app.listen(process.env.PORT || 5000);