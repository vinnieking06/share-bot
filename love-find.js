const request = require('request');
var jsdom = require("jsdom/lib/old-api.js");
const express = require('express');
const headers = require('./private');
const fs = require('fs');
const idData = require('./data');

let users = [];
let userLovers = {};
let test = ['rosy126', 'sneedsi', 'mdoucette1'];
let promises = [];

 async function getLoversFromUsers(users) {
  users.forEach(async item => {
    promises.push(checkLovePagePromise(item));
  });
  await Promise.all(promises);
  fs.writeFileSync('./data.json', JSON.stringify(userLovers, null, 2) , 'utf-8');
}

function getUsers() {
  jsdom.env( {
    url:"https://poshmark.com/feed",
    headers: headers.scrapeHeader,
    scripts:["http://code.jquery.com/jquery.js"],
    done: function (err, window) {
      const elems = window.document.getElementsByClassName('creator-handle');
      for (let i = 0; i < elems.length; i++) {
        users.push(elems[i].innerHTML);
      }
      console.log(users);
      getLoversFromUsers(users);
    }
  })
}

  function checkLovePagePromise(user) {
    return new Promise ((resolve, reject) => {
      jsdom.env( {
        url:`https://poshmark.com/closet/${user}/love-notes`,
        headers: headers.scrapeHeader,
        scripts:["http://code.jquery.com/jquery.js"],
        done: function (err, window) {
          if (err) {
            reject(err);
          }
          const elems = window.document.getElementsByClassName('user-image s');
          let lovers = [];
          let loveId;
          for (let el in elems) {
            loveId = elems[el].src;
            if (grabId(loveId)) {
              lovers.push(grabId(loveId))
            }
          }
          userLovers[user] = lovers;
          resolve();
        }
      })
    })

  }

  //checkLovePagePromise('sfvhotmess');

 
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

function follow(id) {
  let options = {
    url: `https://poshmark.com/user/${id}/follow_user`,
    method: 'POST',
    headers: headers.shareHeaders
  };
  return request(options, callback)
}

function grabId(str) {
  if (!str || str.includes('facebook') || str.includes('user-default')) {
    return false;
  }
  let newStr = str.split('users');
  newStr = newStr[1].split('');
  for (let i = 0; i < 12; i++) {
    newStr.shift();
  }
  let id = [];
  for (let i = 0; i < newStr.length; i++) {
    if (newStr[i] === '/') {
      break;
    } else {
      id.push(newStr[i]) 
    }

  }
  return id.join('')
}
