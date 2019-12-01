var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'managementvisitor5@gmail.com',//represents company mail.
      pass: 'visitor@11'
    }
});

//function to mail PassId to visitor Which will be used at the time of checkout
function passIdMail(newRecord){
  return new Promise(function(resolve, reject) {
    var mailOptions = {
      from: 'managementvisitor5@gmail.com',//represents company mail.
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
          reject(error);
      } else {
          console.log('Email sent to visitor for PassId' + info.response);
          resolve();
      }
    });
  });
}

function visitorDetailsToHost(newRecord, Host){
  return new Promise(function(resolve, reject) {
    Host.findOne({ _id: newRecord.host }, (error, host) => {
        if (error) {
            console.log(error);
            reject(error);
        }
        else if(!host) {
          reject ('No host found');
        }
        var hostMail = host.email;
        
        mailOptions = {
            from: 'managementvisitor5@gmail.com',//company mail
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
              reject (error);
            } else {
              console.log('Email sent to host: ' + info.response);
              resolve();
            }
          });
    });
  });
}


//function called when visitor checks out and gets his visiting details in mail
function visitorDetailsMailToVisitor(visitor, Host){
  return new Promise(function(resolve, reject) { 
    Host.findOne({ _id: visitor.host }, (error, host) => {
        if (error) {
            console.log('actual error');
            console.log(error);
            //throw new Error(error);
            reject(error);
        }
        else if(!host) {
          console.log('No host found');
          //throw new Error('No host found');
          reject('No host found');
        }
        else {
          console.log('host' +host);
          var mailOptions = {
              from: 'managementvisitor5@gmail.com',
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
                //throw new Error(error);
                reject(error);
              } else {
                console.log('CheckOut Email sent: ' + info.response);
                resolve();
              }
            });
        }
    });
  });
}

module.exports.passIdMail = passIdMail;
module.exports.visitorDetailsToHost = visitorDetailsToHost;
module.exports.visitorDetailsMailToVisitor = visitorDetailsMailToVisitor;