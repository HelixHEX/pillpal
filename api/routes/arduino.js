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
var database = firebase.database();
router.post('/dispense', async function (req, res) {
  let myVal = await database.ref('/Patients').orderByChild('name').equalTo("Arya Tschand").once("value");
    myVal = myVal.val();
    if (myVal) {
        for (key in myVal) {
            if (myVal[key].fulfilled == false || myVal[key].fulfilled == "false") {
                let myVal2 = await database.ref('/Positions').orderByChild('pill').equalTo(myVal[key].requested).once("value");
                myVal2 = myVal2.val();
                if (myVal2) {
                    for (key in myVal2) {
                        database.ref('/Patients/Arya Tschand/fulfilled').set(true);
                        // res.send(parseInt(key.substring(1)));
                        res.send(key.substring(1));
                        return;
                    }
                }
            }
        }
    }

    let today = new Date();
    let myVal3 = await database.ref('/Schedule').orderByChild('user').equalTo("Arya Tschand").once("value");
    myVal3 = myVal3.val();
    if (myVal3) {
        for (mainKey in myVal3) {
            if (myVal3[mainKey].fulfilled == false || myVal3[key].fulfilled == "false") {
                let timeList = myVal3[key].date.split("-");
                if (today.getFullYear() > parseInt(timeList[2].substring(0, 4))) {
                    let myVal2 = await database.ref('/Positions').orderByChild('pill').equalTo(myVal3[key].pill).once("value");
                    myVal2 = myVal2.val();
                    if (myVal2) {
                        for (key in myVal2) {
                            // res.send(parseInt(key.substring(1)));
                            database.ref(`/Schedule/${mainKey}/fulfilled`).set(true);
                            res.send(key.substring(1));
                            return;
                        }
                    }
                } else if (today.getFullYear() == parseInt(timeList[2].substring(0, 4))) {
                    if (today.getMonth() + 1 > parseInt(timeList[0])) {
                        let myVal2 = await database.ref('/Positions').orderByChild('pill').equalTo(myVal3[key].pill).once("value");
                        myVal2 = myVal2.val();
                        if (myVal2) {
                            for (key in myVal2) {
                                // res.send(parseInt(key.substring(1)));
                                database.ref(`/Schedule/${mainKey}/fulfilled`).set(true);
                                res.send(key.substring(1));
                                return;
                            }
                        }
                    } else if (today.getMonth() + 1 == parseInt(timeList[0])) {
                        if (today.getDate() > parseInt(timeList[1])) {
                            let myVal2 = await database.ref('/Positions').orderByChild('pill').equalTo(myVal3[key].pill).once("value");
                            myVal2 = myVal2.val();
                            if (myVal2) {
                                for (key in myVal2) {
                                    // res.send(parseInt(key.substring(1)));
                                    database.ref(`/Schedule/${mainKey}/fulfilled`).set(true);
                                    res.send(key.substring(1));
                                    return;
                                }
                            }
                        } else if (today.getDate() == parseInt(timeList[1])) {
                            if (today.getHours() > parseInt(timeList[2].substring(5, 7))) {
                                let myVal2 = await database.ref('/Positions').orderByChild('pill').equalTo(myVal3[key].pill).once("value");
                                myVal2 = myVal2.val();
                                if (myVal2) {
                                    for (key in myVal2) {
                                        // res.send(parseInt(key.substring(1)));
                                        database.ref(`/Schedule/${mainKey}/fulfilled`).set(true);
                                        res.send(key.substring(1));
                                        return;
                                    }
                                }
                            } else if (today.getHours() == parseInt(timeList[2].substring(5, 7))) {
                                if (today.getMinutes() > parseInt(timeList[2].substring(7, 9))) {
                                    let myVal2 = await database.ref('/Positions').orderByChild('pill').equalTo(myVal3[key].pill).once("value");
                                    myVal2 = myVal2.val();
                                    if (myVal2) {
                                        for (key in myVal2) {
                                            // res.send(parseInt(key.substring(1)));
                                            database.ref(`/Schedule/${mainKey}/fulfilled`).set(true);
                                            res.send(key.substring(1));
                                            return;
                                        }
                                    }
                                } else if (today.getMinutes() == parseInt(timeList[2].substring(7, 9))) {
                                    if (today.getSeconds() >= parseInt(timeList[2].substring(9))) {
                                        let myVal2 = await database.ref('/Positions').orderByChild('pill').equalTo(myVal3[key].pill).once("value");
                                        myVal2 = myVal2.val();
                                        if (myVal2) {
                                            for (key in myVal2) {
                                                // res.send(parseInt(key.substring(1)));
                                                database.ref(`/Schedule/${mainKey}/fulfilled`).set(true);
                                                res.send(key.substring(1));
                                                return;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // res.send(0);
    res.send("0");
})

module.exports = router;
