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
          console.log(error);
          res.status(400).send('Failed at adding data to the server.');
         }
         else {
          // console.log(newRecord);
          // console.log('Visitor successfully added.');
          //Send visitor the mail
          try{
            mailService.passIdMail(newRecord);
            mailService.visitorDetailsToHost(newRecord, Host);
            messageService.visitorDetailsToHost(newRecord, Host);
            res.status(201).send('Visitor has been added');
          }
          catch(error) {
            console.log(error);
            res.status(500).send(error);
          }
        }
       });
});

//API for checkout of the visitor
app.post('/checkOut', function (req, res) {
  // console.log(req.query);
  // console.log(Date.now());
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
      try {
        mailService.visitorDetailsMailToVisitor(visitor,Host);
        res.status(200).send('Visitor has checked out successfully');
      }
      catch(error) {
        console.log(error);
        res.status(500).send(error);
      }
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
    else if (!hosts) {
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
          //  console.log(newHost);
          //  console.log('Host successfully added.');
          try{
            //add host's mobile to twilio Account(Only number added in twilio account can be used to send or receive sms in trial version)
            messageService.addHostMobile(newHost);
            res.status(201).send('Host successfully added');
          }
          catch(error) {
            console.log(error);
            res.status(400).send('Failed to add host');
          }
         }
       });
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});
