const request = require('request');
var jsdom = require("jsdom/lib/old-api.js");
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/')); 

app.get('/start', (req, res) => {
  delayScrapeAndShare();
  res.end('it has begun');
})

var scrapeHeader =  {
    'if-none-match': '"b3afce3dc882c217dfa83efa9f9adf9f"',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.8',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'cache-control': 'max-age=0',
    'authority': 'poshmark.com',
    'cookie': '__ssid=27b0efe7-cfaa-4dd7-bfe8-c3c7018bdcb6; fbm_182809591793403=base_domain=.poshmark.com; ps=%7B%22bid%22%3A%2259894ea5b88c56bbc77bddc4%22%7D; __ssid=27b0efe7-cfaa-4dd7-bfe8-c3c7018bdcb6; fbm_182809591793403=base_domain=.poshmark.com; hbb=true; rt=%7B%22src%22%3A%5B%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%5D%7D; tgprm=true; tgfd=true; tgsh=true; _gat=1; _gat_tracker1=1; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278; tgprm=true; tgfd=true; tgsh=true; tgld=true; fbsr_182809591793403=-Vksahn20xhXMczE9BZ783_PxqJP23ENm4mmaQnBPZ4.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUEtaDc5NEMtR3lhdXpYZXBlY0N6aHdQMkpSRGM2dUlKblNUX0gtSFZ1dVI3WmhWaDZ2SDNxN2dhNXhEMFdHd2xrZmNLUEVQVDlTMWhBZGhscGhYLUU1bUFCNEREVWVnZFRPRGljTWVXdlgzTEJTSTd2NHNSdFl4VkRJQmFYbHhFZWhkdXc1MkoyUkpTeXlRSnpqNWpuY1VtVGdVWlpjWG8zVjdRWmw0UXc3dTV1RU9kMGR6VVBTbTZvRE5hT0ZBb3dZclo4SEE0RUlBVVFpNGtVSURWMWFDOFlPakZHck1OQzBSZlI5LU1QWTNRUktWV3FMT3dMSkIwaWJuN2FFaWxqR0JKdEpPdjZOMWNQNUZuekZDdVFlS1dSWS1SX2FXNTgwVlBkVnpYaVZGXzU0SFJLUkVPbE9MVmdpc0M2VlhsT3RxdHVIeTZEZHk2QnpVZmZTQ1l4eiIsImlzc3VlZF9hdCI6MTUwMjYwOTkyNywidXNlcl9pZCI6IjEwMjEwMjIwMDU0NDM3ODI2In0; ui=%7B%22dh%22%3A%22linseybroooke%22%2C%22uit%22%3A%22https%3A%2F%2Fgraph.facebook.com%2Fv2.6%2F10210220054437826%2Fpicture%22%2C%22uid%22%3A%2259581cec1d2f9043d0113f37%22%2C%22em%22%3A%22moenlinsey%40gmail.com%22%2C%22fn%22%3A%22Linsey+Moen%22%2C%22roles%22%3A%5B%5D%2C%22ge%22%3A%22female%22%7D; sp=%7B%22type%22%3A%22listings%22%2C%22dept%22%3A%22Women%22%7D; _web_session=BAh7CEkiD3Nlc3Npb25faWQGOgZFRkkiJTI0MjcwNjI5Mjg3ZmIxNGI3ZmI4YjljNmU0NzM5MzI1BjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMWRRVk0vN1JpMnpUdS9FT1VuMlZzZmNPTk9OTFA1NlVRMVRXd01LLzNnd0E9BjsARkkiEWFjY2Vzc190b2tlbgY7AEZJIgGWTlRrMU9ERmpaV014WkRKbU9UQTBNMlF3TVRFelpqTTNmREUxTXpReE5EVTVNamg4TUM0eWZEQjhOVGs1TURBeU1EZ3haREptT1RBek5qWmxOelZoWm1VMWZEQjhWR2gwWm5wNFRFTmxVRkpHVTJGT1h6TlJRVkp6TUVsUlNsSm1YMnc1Um5sQmFHaE5ZbWMyUVZnMVJRBjsARg%3D%3D--4c0c6602bbd3f5fe7de037010fca1f738d5735eb; wba=2017-08-13T00%3A38%3A48-07%3A00; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278',
    'referer': 'https://poshmark.com/'
};


var shareHeaders = {
    'origin': 'https://poshmark.com',
    'accept-encoding': 'gzip, deflate, br',
    'x-csrf-token': 'dQVM/7Ri2zTu/EOUn2VsfcONONLP56UQ1TWwMK/3gwA=',
    'x-requested-with': 'XMLHttpRequest',
    'accept-language': 'en-US,en;q=0.8',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'accept': '*/*',
    'referer': 'https://poshmark.com/feed',
    'authority': 'poshmark.com',
    'cookie': '__ssid=27b0efe7-cfaa-4dd7-bfe8-c3c7018bdcb6; fbm_182809591793403=base_domain=.poshmark.com; ps=%7B%22bid%22%3A%2259894ea5b88c56bbc77bddc4%22%7D; __ssid=27b0efe7-cfaa-4dd7-bfe8-c3c7018bdcb6; fbm_182809591793403=base_domain=.poshmark.com; hbb=true; rt=%7B%22src%22%3A%5B%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%5D%7D; tgprm=true; tgfd=true; tgsh=true; _gat=1; _gat_tracker1=1; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278; tgld=true; ui=%7B%22dh%22%3A%22linseybroooke%22%2C%22uit%22%3A%22https%3A%2F%2Fgraph.facebook.com%2Fv2.6%2F10210220054437826%2Fpicture%22%2C%22uid%22%3A%2259581cec1d2f9043d0113f37%22%2C%22em%22%3A%22moenlinsey%40gmail.com%22%2C%22fn%22%3A%22Linsey+Moen%22%2C%22roles%22%3A%5B%5D%2C%22ge%22%3A%22female%22%7D; sp=%7B%22type%22%3A%22listings%22%2C%22dept%22%3A%22Women%22%7D; _web_session=BAh7CEkiD3Nlc3Npb25faWQGOgZFRkkiJTI0MjcwNjI5Mjg3ZmIxNGI3ZmI4YjljNmU0NzM5MzI1BjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMWRRVk0vN1JpMnpUdS9FT1VuMlZzZmNPTk9OTFA1NlVRMVRXd01LLzNnd0E9BjsARkkiEWFjY2Vzc190b2tlbgY7AEZJIgGWTlRrMU9ERmpaV014WkRKbU9UQTBNMlF3TVRFelpqTTNmREUxTXpReE5EVTVNamg4TUM0eWZEQjhOVGs1TURBeU1EZ3haREptT1RBek5qWmxOelZoWm1VMWZEQjhWR2gwWm5wNFRFTmxVRkpHVTJGT1h6TlJRVkp6TUVsUlNsSm1YMnc1Um5sQmFHaE5ZbWMyUVZnMVJRBjsARg%3D%3D--4c0c6602bbd3f5fe7de037010fca1f738d5735eb; wba=2017-08-13T00%3A38%3A48-07%3A00; tgprm=true; tgfd=true; tgsh=true; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278',
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

function scrapeAndShare() {
  request('https://cryptic-everglades-20750.herokuapp.com/', callback);
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