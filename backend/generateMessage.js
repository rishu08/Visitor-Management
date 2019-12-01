const accountSid = 'ACf79db57a94ff6cb955384b9e6ba919ed';
const authToken = '47c2d166140f560f6afffe2818350efb';
const client = require('twilio')(accountSid, authToken);

function visitorDetailsToHost(newRecord,Host) {
    return new Promise(function(resolve, reject) {
    Host.findOne({_id: newRecord.host}, (error,host)=> {
        if(error) {
            //throw error;
            reject (error);
        }
        else if(!host) {
            //throw 'No Host found';
            reject('No Host found');
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
            .then(message => {
                console.log('message sent successfully to host - '+message.sid);
                resolve();
            }).catch(error => {
                console.log('in inner');
                console.log(error);
                //throw error;
                reject(error);
            });
            }
      });
    });
}

//function to add host mobile to twilio account(Only number added in twilio account can be used to send or receive sms in trial version)
function addHostMobile(host) {
    return client.validationRequests
       .create({friendlyName: host.name, phoneNumber: `+${host.mobile}`})
       .then(validation_request => console.log('mobile successfully added' +validation_request.friendlyName))
       .catch(error =>{
           console.log(error);
           throw error;
        }); 
}

module.exports.visitorDetailsToHost = visitorDetailsToHost;
module.exports.addHostMobile = addHostMobile;