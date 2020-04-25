var express = require("express");
var router = express.Router();

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


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

router.get("/leaderboard", function(req, res, next) {
  var leader =[];
  database.ref('/leaderboard').orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      leader.push(`${data.key} - ${data.val()}`);
    });
  })
  var toreturn = "";
  for (var i = leader.length-1; i > 0; i--) {
    toreturn += leader[i];
    toreturn += ",";
  }
  toreturn += leader[0];
  res.send(toreturn);
});

router.get("/storage", function(req, res, next) {
  database.ref('/user1').once('value').then(function(snapshot) {
    res.send(`${snapshot.val().storaget},${snapshot.val().storager}`);
  });
});

router.get("/stats", function(req, res, next) {
  database.ref('/user1').once('value').then(function(snapshot) {
    res.send(`${snapshot.val().trash},${snapshot.val().recycle}`);
  });
});

app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

router.get("/history", function(req, res, next) {
  var history = [];
  var toreturn = "";
  database.ref('/user1/history').on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      history.push(`${data.key} - ${data.val().type}`);
    });
  })
  for (var i = 0; i < history.length-1; i++) {
    toreturn += history[i];
    toreturn += ",";
  }
  toreturn += history[history.length-1];
  res.send(toreturn);
});

router.get("/history/image", function(req, res, next) {
  var date = req.query.date;
  console.log(req.query.date)
  function base64_encode(file) {
   // read binary data
   var bitmap = fs.readFileSync(file);
   // convert binary data to base64 encoded string
   return new Buffer(bitmap).toString('base64');
  }
  var base64str = base64_encode(`public/images/${date}.jpg`);
  res.send(base64str)
});

router.get("/update", function(req, res, next) {
  var trashlevel = req.query.trash;
  var reclevel = req.query.recycle;
  database.ref('/user1').update({
    storaget: parseInt(trashlevel),
    storager: parseInt(reclevel)
  }, function(error) {
    if (error) {
      res.send("Error")
    } else {
      res.send("Success");
    }
  })
});

router.get("/image", function(req, res, next) {
  var date = req.query.date;
  var type = req.query.type;
  database.ref('/user1/history').child(date).set({
    type: type
  }, function(error) {
    if (error) {
      console.log(error)
    } else {
      res.send("Success")
    }
  })
})

router.get('/trash', function(req, res, next) {
  database.ref('/user1').once('value').then(function(snapshot) {
    res.send("hi")
  })
})

var path = require('path');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));
var fs = require('fs');

router.post('/upload', upload.single('wallpaper'), function (req, res) {
  var imagePath = req.file.path.replace(/^public\//, '');
  res.send(imagePath)
});




module.exports = router;
