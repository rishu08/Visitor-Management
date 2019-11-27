var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'rg081999@gmail.com',//represents company mail.
      pass: 'gupta@1999'
    }
});

function passIdMail(newRecord){
    var mailOptions = {
        from: 'rg081999@gmail.com',//represents company mail.
        to: newRecord.email,
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
            console.log('Email sent to visitor for PassId' + info.response);
        }
    });
}

function visitorDetailsToHost(newRecord, Host){
    
    Host.findOne({ _id: newRecord.host }, (err, host) => {
        if (err) {
            console.log("host is not found!");
            throw err;
        }
        var hostMail = host.email;
        
        mailOptions = {
            from: 'rg081999@gmail.com',//company mail
            to: hostMail,
            subject: 'Visitor Details',
            html: `Hi,
                  <br>Your visitor details are as follows:
                  <br>1.Name: ${newRecord.firstName} ${newRecord.lastName}
                  <br>2.Email: ${newRecord.email}
                  <br>3.Phone: ${newRecord.mobile}
                  <br>4.Check-in time: ${newRecord.checkIn}
                  <br>Thank you`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent to host: ' + info.response);
            }
          });
    });
}

function visitorDetailsMailToVisitor(visitor, Host){
    
    Host.findOne({ _id: visitor.host }, (err, host) => {
        if (err) {
            console.log("host is not found!");
            throw err;
        }
        var mailOptions = {
            from: 'rg081999@gmail.com',
            to: visitor.email,
            subject: 'Visiting Details',
            html: `Hi,
                  <br>Thank you for visiting us.
                  <br>Your visit details are as follows:
                  <br>1.Name: ${visitor.firstName} ${visitor.lastName}
                  <br>2. Phone: ${visitor.mobile}
                  <br>3. Check-in time: ${visitor.checkIn}
                  <br>4. Check-out time: ${visitor.checkOut}
                  <br>5. Host name: ${host.name}
                  <br>6. Address visited: ${host.address}
                  <br>We wish you visit us soon.
                  <br>Thank you`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('CheckOut Email sent: ' + info.response);
            }
          });
    });
}

module.exports.passIdMail = passIdMail;
module.exports.visitorDetailsToHost = visitorDetailsToHost;
module.exports.visitorDetailsMailToVisitor = visitorDetailsMailToVisitor;