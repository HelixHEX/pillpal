var express = require("express");
var router = express.Router();

var app = express();
const bcrypt = require('bcryptjs');

var firebase = require("firebase");
require("firebase/firestore");
require('firebase/storage');
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

var database = firebase.database();

router.post('/signUp', async function (req, res) {
    let info = req.headers;
    let email = info.email;
    let firstName = info.firstname;
    let lastName = info.lastname;
    let password = info.password;
    let passwordConfirm = info.passwordconfirm;
    let userType = info.usertype;
    let patientType = info.patienttype;
    let pillJson = info.pilljson;
    let returnVal;
    if (userType == "Doctor") {
        if (!email) {
            returnVal = {
                data: 'Please enter an email address.'
            };
            res.send(returnVal);
            return;
        }
        let myVal = await database.ref("Doctors").orderByChild('email').equalTo(email).once("value");
        myVal = myVal.val();
        if (myVal) {
            returnVal = {
                data: 'Email already exists.'
            };
        } else if (firstName.length == 0 || lastName.length == 0) {
            returnVal = {
                data: 'Invalid Name'
            };
        } else if (!(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(firstName) && /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(lastName))) {
            returnVal = {
                data: 'Invalid Name'
            };
        } else if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
            .test(email))) {
            returnVal = {
                data: 'Invalid email address.'
            };
        } else if (password.length < 6) {
            returnVal = {
                data: 'Your password needs to be at least 6 characters.'
            };
        } else if (password != passwordConfirm) {
            returnVal = {
                data: 'Your passwords don\'t match.'
            };
        } else {
            database.ref(`Doctors/${firstName} ${lastName}/email`).set(email);
            database.ref(`Doctors/${firstName} ${lastName}/password`).set(hash(password));
            returnVal = {
                data: "Valid User"
            }
        }
    } else {
        if (!email) {
            returnVal = {
                data: 'Please enter an email address.'
            };
            res.send(returnVal);
            return;
        }
        let myVal = await database.ref("Patients").orderByChild('email').equalTo(email).once("value");
        myVal = myVal.val();
        if (myVal) {
            returnVal = {
                data: 'Email already exists.'
            };
        } else if (firstName.length == 0 || lastName.length == 0) {
            returnVal = {
                data: 'Invalid Name'
            };
        } else if (!(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(firstName) && /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(lastName))) {
            returnVal = {
                data: 'Invalid Name'
            };
        } else if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
            .test(email))) {
            returnVal = {
                data: 'Invalid email address.'
            };
        } else if (password.length < 6) {
            returnVal = {
                data: 'Your password needs to be at least 6 characters.'
            };
        } else if (password != passwordConfirm) {
            returnVal = {
                data: 'Your passwords don\'t match.'
            };
        } else {
            database.ref(`Patients/${firstName} ${lastName}/email`).set(email);
            database.ref(`Patients/${firstName} ${lastName}/name`).set(`${firstName} ${lastName}`);
            database.ref(`Patients/${firstName} ${lastName}/password`).set(hash(password));
            database.ref(`Patients/${firstName} ${lastName}/patientType`).set(patientType);
            database.ref(`Patients/${firstName} ${lastName}/pills`).set(pillJson);
            database.ref(`Patients/${firstName} ${lastName}/requested`).set("none");
            database.ref(`Patients/${firstName} ${lastName}/fulfilled`).set("empty");
            database.ref(`Patients/${firstName} ${lastName}/pills`).set(pillJson);
            returnVal = {
                data: "Valid User"
            }
        }
    }
    res.send(returnVal);
})
    .post('/signIn', async function (req, res) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'https://syncfast.macrotechsolutions.us');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        let info = req.headers;
        let email = info.email;
        let password = info.password;
        let returnVal;
        let myVal = await database.ref("Patients").orderByChild('email').equalTo(email).once("value");
        myVal = myVal.val();
        if (!myVal) {
            let myVal2 = await database.ref("Doctors").orderByChild('email').equalTo(email).once("value");
            myVal2 = myVal2.val();
            if (!myVal2) {
                returnVal = {
                    data: "Incorrect email address."
                }
            } else {
                let doctorName = "";
                let userPassword;
                for (key in myVal) {
                    doctorName = key;
                    userPassword = myVal[key].password;
                }
                let inputPassword = password;
                if (bcrypt.compareSync(inputPassword, userPassword)) {
                    returnVal = {
                        data: "Valid User",
                        name: doctorName,
                        user: "Doctor"
                    }
                } else {
                    returnVal = {
                        data: "Incorrect Password"
                    }
                }
            }
        } else {
            let patientName = "";
            let userPassword;
            for (key in myVal) {
                patientName = key;
                userPassword = myVal[key].password;
            }
            let inputPassword = password;
            if (bcrypt.compareSync(inputPassword, userPassword)) {
                returnVal = {
                    data: "Valid User",
                    name: patientName,
                    user: "Patient"
                }
            } else {
                returnVal = {
                    data: "Incorrect Password"
                }
            }
        }
        res.send(returnVal);
    })

function hash(value) {
    let salt = bcrypt.genSaltSync(10);
    let hashVal = bcrypt.hashSync(value, salt);
    return hashVal;
}

module.exports = router;
