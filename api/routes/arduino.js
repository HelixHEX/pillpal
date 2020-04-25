var express = require('express');
var router = express.Router();

var firebase = require("firebase");
require("firebase/firestore");
require('firebase/storage')
const config = {
  apiKey: "AIzaSyAs6rfrAa5ZZ1GPsj4ZiQvsHO6n4moxwj8",
  authDomain: "pillpall-d2a9b.firebaseapp.com",
  databaseURL: "https://pillpall-d2a9b.firebaseio.com",
  projectId: "pillpall-d2a9b",
  storageBucket: "pillpall-d2a9b.appspot.com",
  messagingSenderId: "174140800491",
  appId: "1:174140800491:web:36b6d8b4a25caeafb2adae",
  measurementId: "G-PFGVVDJXPC"
};

firebase.initializeApp(config);
app.use(express.static('uploads'));

var database = firebase.database();

router.get('/dispense', function(req, res, next) {
  var user = 'Eli'
  var positions = []
  database.ref(`availablepositions`).equalTo(false).on('child_added', snapshot => {

  })
});

module.exports = router;
