var mongoose = require('mongoose');
var Visitor  = require('./models/visitorModel.js');
var Host = require('./models/hostModel.js');
var express = require('express');
var app = express();
var mailService = require('./generateMail.js');
var messageService = require('./generateMessage.js');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
   res.send('Server connected Successfully');
});

//API to add visitor to database and get passId for visitor which would be used during the time of checkout
app.post('/generatePass', function (req, res) {
  // console.log(req.query);
  var newRecord = new Visitor ({
       _id: new mongoose.Types.ObjectId(),
       firstName: req.query.firstName,
       lastName: req.query.lastName,
       email : req.query.email,
       mobile: req.query.mobile,
       host: req.query.host
     });

     newRecord.save(function(error) {
        if (error) {
          // console.log(error);
          res.status(400).send('Failed at adding data to the server.');
         }
         else {
          //Send visitor the mail
          sendInfoForCheckIn(newRecord, Host).then(()=>{
            res.status(201).send('Visitor has been added and information for appointment has been sent to visitor and host');
          }).catch((err)=>{
            // console.log('got error');
            // console.log(err);
            res.status(500).send('Visitor has been added but '+err);
          });
        }
       });
});

//API for checkout of the visitor
app.post('/checkOut', function (req, res) {
  let currentTime = Date.now();
  Visitor.findOneAndUpdate({ _id: req.query.pass }, {$set:{checkOut:currentTime}}, {new: true}, (error, visitor) => {
    if (error) {
      res.status(404).send("Something wrong when updating data!");
      console.log("Something wrong when updating data!");
    }
    else if(!visitor) {
      res.status(404).send("No record found with such data");
      console.log("No record found with such data");
    }
    else {
      sendInfoForCheckOut(visitor, Host).then(()=>{
        res.status(201).send('Checkout done successfully');
      }).catch((err)=>{
        console.log(err);
        res.status(500).send('Checkout done but '+err);
      });
    }
  });
});

//API to get all host
app.post('/getHosts', function (req, res) {
  Host.find((error, hosts) => {
    if(error)
    {
      res.status(404).send('No hosts found');
      // console.log('cannot get hosts');
    }
    else if (!hosts || hosts.length === 0) {
      res.status(404).send('No hosts found');
    }
    else {
      // console.log(hosts);
      res.status(200).send(hosts);
    }
  });
});

//API to add a new host to the database
app.post('/addHost', function (req, res) {
  // console.log(req.query);
  var newHost = new Host ({
       _id: new mongoose.Types.ObjectId(),
       name: req.query.name,
       email : req.query.email,
       mobile: req.query.mobile,
       address: req.query.address
     });

     newHost.save(function(error) {
        if (error) {
          // console.log(error);
          res.status(400).send('Failed at adding data to the server.');
         }
         else {
            //add host's mobile to twilio Account(Only number added in twilio account can be used to send or receive sms in trial version)
            // await messageService.addHostMobile(newHost);
            addHostMobile(newHost).then(()=>{
              res.status(201).send('Host successfully added and mobile number verified');
            }).catch((err)=>{
              console.log(err.message);
              if(err.message === "Phone number is already verified.") {
                res.status(201).send('Host successfully added and '+err.message);
              }
              else{
                res.status(400).send('Host added but '+err.message);
              }
            });
         }
       });
});

const addHostMobile = async (newHost) => {
  try {
    await messageService.addHostMobile(newHost);
  } catch (error) {
    throw error;
  }
 }

 const sendInfoForCheckIn = async (newRecord, Host) => {
  try {
    await mailService.passIdMail(newRecord).catch((error)=>{
      console.log(error.message);
      throw ('passID not sent to visitor.');
    });
    await mailService.visitorDetailsToHost(newRecord, Host).catch((error)=>{
      console.log(error.message);
      throw ('visitor details mail not sent to host.');
    });
    await messageService.visitorDetailsToHost(newRecord, Host).catch((error)=>{
      console.log(error.message);
      throw ('visitor details message not sent to host.');
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
 }

 const sendInfoForCheckOut = async (visitor, Host) => {
  try {
    await mailService.visitorDetailsMailToVisitor(visitor,Host).catch((error)=>{
      console.log(error);
      throw ('Checkout details not mailed to visitor');
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
 }

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening at http://%s:%s", host, port)
});
