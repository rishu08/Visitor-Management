var mongoose = require('mongoose');
var Visitor  = require('./models/visitorModel.js');
var express = require('express');
var app = express();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'rg081999@gmail.com',
    pass: 'gupta@1999'
  }
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
       mobile: req.query.mobile
     });

     newRecord.save(function(err) {
         if (err) throw err;
         console.log(newRecord);
         console.log('Visitor successfully added.');
       });
  res.send('Pass Generated');
  var mailOptions = {
    from: 'rg081999@gmail.com',
    to: req.query.email,
    subject: 'Pass Id',
    html: `Hi,
          <br>Your pass Id has been generated.
          <br>Pass Id: ${newRecord._id}.
          <br>Please use this at the time of checkout<br>
          Thank you`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

app.post('/checkOut', function (req, res) {
  console.log(req.query);
  console.log(Date.now());
  let currentTime = Date.now();
  Visitor.findOneAndUpdate({ _id: req.query.pass }, {$set:{checkOut:currentTime}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
    var mailOptions = {
      from: 'rg081999@gmail.com',
      to: doc.email,
      subject: 'Visiting Details',
      html: `Hi,
            <br>Thank you for visiting us.
            <br>Your visit details are as follows:
            <br>1.Name: ${doc.firstName} ${doc.lastName}
            <br>2. Phone: ${doc.mobile}
            <br>3. Check-in time: ${doc.checkIn}
            <br>4. Check-out time: ${doc.checkOut}
            <br>5. Host name:
            <br>6. Address visited:
            <br>We wish you visit us soon.
            Thank you`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('CheckOut Email sent: ' + info.response);
      }
    });
});
res.send('Visitor has checked out successfully');
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
