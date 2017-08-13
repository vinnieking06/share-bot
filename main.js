const request = require('request');
var jsdom = require("jsdom/lib/old-api.js");
const express = require('express');
const headers = require('./private');

const app = express();

app.use(express.static(__dirname + '/')); 

app.get('/start', (req, res) => {
  delayScrapeAndShare();
  res.end('it has begun');
})

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

function scrapeAndShare() {
  request('https://cryptic-everglades-20750.herokuapp.com/', callback);
  jsdom.env( {
    url:"https://poshmark.com/feed",
    headers: headers.scrapeHeader,
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
    headers: headers.shareHeaders
  };
  return request(options, callback)
}

app.listen(process.env.PORT || 5000);