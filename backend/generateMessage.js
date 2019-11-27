const accountSid = 'ACf79db57a94ff6cb955384b9e6ba919ed';
const authToken = '47c2d166140f560f6afffe2818350efb';
const client = require('twilio')(accountSid, authToken);

function visitorDetailsToHost(newRecord,Host) {
    Host.findOne({_id: newRecord.host}, (err,host)=> {
        if(err) {
          console.log(err);
        }
        else {
          client.messages.create({
              body: `
 Hi,
 You have a visitor with following details:
 Name: ${newRecord.firstName} ${newRecord.lastName}
 Email: ${newRecord.email}
 Mobile: ${newRecord.mobile}
 CheckIn: ${newRecord.checkIn}
 Thankyou`,
              from: '+14159657238',//company registered mobile
              to: `+${host.mobile}`
            })
            .then(message => console.log(message.sid))
            .catch(error => console.log(error));
            }
      });
}

function addHostMobile(host) {
    client.validationRequests
       .create({friendlyName: host.name, phoneNumber: `+${host.mobile}`})
       .then(validation_request => console.log(validation_request.friendlyName))
       .catch(err=>console.log(err)); 
}

module.exports.visitorDetailsToHost = visitorDetailsToHost;
module.exports.addHostMobile = addHostMobile;