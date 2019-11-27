var mongoose = require('mongoose');
var Visitor  = require('./models/visitorModel.js');
var Host = require('./models/hostModel.js');
var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
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

app.post('/generatePass', function (req, res) {
  console.log(req.query);
  var newRecord = new Visitor ({
       _id: new mongoose.Types.ObjectId(),
       firstName: req.query.firstName,
       lastName: req.query.lastName,
       email : req.query.email,
       mobile: req.query.mobile,
       host: req.query.host
     });

     newRecord.save(function(err) {
        if (err) {
          console.log(error);
          throw err;
         }
         console.log(newRecord);
         console.log('Visitor successfully added.');
         //Send visitor the mail
         try{
           mailService.passIdMail(newRecord);
           mailService.visitorDetailsToHost(newRecord, Host);
           messageService.visitorDetailsToHost(newRecord, Host);
         }
         catch(error) {
           console.log(error);
         }
       });
  res.send('Pass Generated');
  //handle this in if case
});

app.post('/checkOut', function (req, res) {
  console.log(req.query);
  console.log(Date.now());
  let currentTime = Date.now();
  Visitor.findOneAndUpdate({ _id: req.query.pass }, {$set:{checkOut:currentTime}}, {new: true}, (err, visitor) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }
    else {
      try {
        mailService.visitorDetailsMailToVisitor(visitor,Host);
      }
      catch(error) {
        console.log(error);
      }
    }
  });
res.send('Visitor has checked out successfully');
});


app.post('/getHosts', function (req, res) {
  Host.find((err, hosts) => {
    if(err)
    {
      console.log('cannot get hosts');
    }
    console.log(hosts);
    res.send(hosts);
  });
});

app.post('/addHost', function (req, res) {
  console.log(req.query);
  var newHost = new Host ({
       _id: new mongoose.Types.ObjectId(),
       name: req.query.name,
       email : req.query.email,
       mobile: req.query.mobile,
       address: req.query.address
     });

     newHost.save(function(err) {
        if (err) {
          console.log(error);
          throw err;
         }
         console.log(newHost);
         console.log('Host successfully added.');
         //add host's mobile to twilio
         messageService.addHostMobile(newHost);
       });
  res.send('Host successfully added.');
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});
