const request = require('request');
const path = require('path');
var jsdom = require("jsdom/lib/old-api.js");
const bodyParser = require('body-parser');
const express = require('express');
const headerService = require('./create-header');
const headers = require('./private');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.static(path.join(__dirname, '/client/build')))

const globalProcess = {};

app.post('/request', (req, res) => {
  res.json('hello');
  const cookie = req.body.request;
  const id = req.body.id;
  delayScrapeAndShare(cookie, id);
})

app.post('/stop', (req, res) => {
  stop(req.body.id);
})

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});
function randomNumTo25() {
  return Math.floor((Math.random() * 35000) + 1);

}

function delay(t){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },t)
    })
}

async function delayShare(arr, cookie) {
    let random;
    for(let i of arr){
      console.log('sharing', i);
        random = randomNumTo25();
        await delay(random);
        share(i, cookie);
    }
}

function delayScrapeAndShare(cookie, id) {
  console.log('initiating');
  scrapeAndShare(cookie);
  globalProcess[id] = setInterval(() => { scrapeAndShare(cookie) }, 1560000  );
}

function stop(id) {
  clearInterval(globalProcess[id]);
}

function scrapeAndShare(cookie) {
  request('https://sleepy-spire-63501.herokuapp.com/', callback);
  jsdom.env( {
    url:"https://poshmark.com/feed",
    headers: headerService.createScrapeHeaders(cookie),
    scripts:["http://code.jquery.com/jquery.js"],
    done: function (err, window) {
      const ids = window.document.getElementsByClassName('tile');
      const final = [];
      for (let i = 0; i < ids.length; i++) {
        final.push(ids[i].id);
      }
      delayShare(final, cookie );
    }
  })
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

function share(id, cookie) {
  let options = {
    url: `https://poshmark.com/listing/share?post_id=${id}`,
    method: 'POST',
    headers: headerService.createShareHeaders(cookie)
  };
  return request(options, callback)
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on ${process.env.PORT || 5000}`)
});