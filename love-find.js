const request = require('request');
var jsdom = require("jsdom/lib/old-api.js");
const express = require('express');
const headers = require('./private');
const fs = require('fs');

let users = [];
let userLovers = {};
let test = ['rosy126', 'sneedsi', 'mdoucette1'];


  test.forEach(item => {
    checkLovePage(item);
  });

  setTimeout(() => {
    console.log(userLovers);
  },6000)







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
    }
  })
}


  function checkLovePage(user) {
    jsdom.env( {
      url:`https://poshmark.com/closet/${user}/love-notes`,
      headers: headers.scrapeHeader,
      scripts:["http://code.jquery.com/jquery.js"],
      done: function (err, window) {
        const elems = window.document.getElementsByClassName('text-con');
        let lovers = [];
        let loveNote;
        for (let el in elems) {
          loveNote = elems[el].childNodes[0].innerHTML
          if (user !== loveNote) {
            lovers.push(loveNote);
          }
        }
        userLovers[user] = lovers;
      }
    })
  }

  //checkLovePage('veronicaliz');

 
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

//let obj = {data: lovers}; 

//fs.writeFileSync('./data.json', JSON.stringify(obj, null, 2) , 'utf-8');


