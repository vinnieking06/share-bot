var jsdom = require("jsdom/lib/old-api.js");
var request = require('request');

const test = `var request = require('request');

var headers = {
    'if-none-match': '"e86a2b7335d3f49cc100f47c75791281"',
    'origin': 'http://evil.com/',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.8',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'authority': 'poshmark.com',
    'cookie': '__ssid=10793118-a475-4156-a68c-67ad622143a3; fbm_182809591793403=base_domain=.poshmark.com; ps=%7B%22bid%22%3A%2259894ea5b88c56bbc77bddc4%22%7D; __ssid=27b0efe7-cfaa-4dd7-bfe8-c3c7018bdcb6; fbm_182809591793403=base_domain=.poshmark.com; hbb=true; tgprm=true; tgfd=true; tgsh=true; _gat=1; _gat_tracker1=1; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278; rt=%7B%22src%22%3A%5B%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2F%22%2C%22lpt%22%3A%22Home%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2F%22%2C%22lpt%22%3A%22Home%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2F%22%2C%22lpt%22%3A%22Home%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2F%22%2C%22lpt%22%3A%22Home%22%2C%22rs%22%3Anull%7D%5D%7D; ui=%7B%22dh%22%3A%22vinnieking06%22%2C%22uit%22%3A%22https%3A%2F%2Fgraph.facebook.com%2Fv2.6%2F10209870557706559%2Fpicture%22%2C%22uid%22%3A%2259894ec565514541f77c5bdc%22%2C%22em%22%3A%22vincent.king1224%40gmail.com%22%2C%22fn%22%3A%22Vinnie+King%22%2C%22roles%22%3A%5B%5D%2C%22ge%22%3A%22male%22%7D; sp=%7B%22type%22%3A%22listings%22%2C%22dept%22%3A%22Men%22%7D; _web_session=BAh7CEkiD3Nlc3Npb25faWQGOgZFRkkiJTA1YjI1MWFkMWM4OWE3Mjk4YTgwNTdmYjAyZGMyMTNjBjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMVd0eW9oY1JTL3VhWHZocUxTN0F2YkticGgwQWJudDJXTXR6SGJWei9pL2c9BjsARkkiEWFjY2Vzc190b2tlbgY7AEZJIgGWTlRrNE9UUmxZelUyTlRVeE5EVTBNV1kzTjJNMVltUmpmREUxTXpRMk16VXpNREo4TUM0eWZEQjhOVGs1TnpjNVlUWTFNMlJpTlRGbE5qY3dNV05tTjJRNWZEQjhWbXR6WDNoV1REQmlVR055WkMxRFgzaEdURXQwUjJGTVgyVktaMDlJZEZwM1YzSmlZbmhIUm1ndGF3BjsARg%3D%3D--7cdcfd6d6f0cc6690e90ec75508fcde63bf6a165; mysize=none; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278; tgnb=true; tgprm=true; tgfd=true; tgsh=true'
};

var options = {
    url: 'https://poshmark.com/feed',
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);`

function cookieGrabber(str) {
  let curl = str.split(`cookie:`)
  let curl2 = curl[1];
  let curl3 = curl2.split('--compressed');
  let curl4 = curl3[0];
  let arr = curl4.split('');
  arr.shift();
  arr.pop();
  arr.pop();
  arr.pop();
  arr = arr.join('')
  return arr
};

function createShareHeaders(input) {
  //evil.com?
    return {
      'origin': 'https://poshmark.com',
      'accept-encoding': 'gzip, deflate, br',
      'x-csrf-token': 'dQVM/7Ri2zTu/EOUn2VsfcONONLP56UQ1TWwMK/3gwA=',
      'x-requested-with': 'XMLHttpRequest',
      'accept-language': 'en-US,en;q=0.8',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      'accept': '*/*',
      'referer': 'https://poshmark.com/feed',
      'authority': 'poshmark.com',
      'cookie': cookieGrabber(input),
      'content-length': '0'
   };
}

function createScrapeHeaders(input) {
    return {
    'if-none-match': '"e86a2b7335d3f49cc100f47c75791281"',
    'origin': 'https://poshmark.com',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.8',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'cache-control': 'max-age=0',
    'authority': 'poshmark.com',
    'cookie': cookieGrabber(input),
    'referer': 'https://poshmark.com/login'
 };
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

  function follow(id) {
  console.log('id', id);
  let options = {
    url: `https://poshmark.com/user/${id}/follow_user`,
    method: 'POST',
    headers: shareHeaders
  };
  return request(options, callback)
}

//cookieGrabber(test);
module.exports = { createScrapeHeaders: createScrapeHeaders, createShareHeaders: createShareHeaders }
//follow('575ccdb5cbdde22a5109c084');