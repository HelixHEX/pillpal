var express = require("express");
var router = express.Router();

var app = express();

/*
var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds();
var nowDate = month + '-' + date + '-' + year + '-' + hours + ':' + min + ':' + sec
*/

var firebase = require("firebase");
require('firebase/storage')
const config = {
  apiKey: "AIzaSyARMovlsnfFf1PEUhERmM3NVhKsrLiusyE",
  authDomain: "qbhacks-ff9af.firebaseapp.com",
  databaseURL: "https://qbhacks-ff9af.firebaseio.com",
  projectId: "qbhacks-ff9af",
  storageBucket: "qbhacks-ff9af.appspot.com",
  messagingSenderId: "957912266772",
  appId: "1:957912266772:web:e8f1a8d26957fc94f54f01",
  measurementId: "G-ERSPHDVVTR"
};

firebase.initializeApp(config);
var database = firebase.database();

router.post('/newschedule', function(req, res, next) {
  var date = req.headers.date
  var pill = req.headers.pill
  var user = req.headers.user

  console.log(date)
  console.log(pill)
  console.log(user)

  database.ref(`/Schedule/`).push({
    user: user,
    pill: pill,
    fulfilled: false,
    date: date,
  })
})

module.exports = router;
