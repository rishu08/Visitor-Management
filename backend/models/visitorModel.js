var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/visitor-management', function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

const Schema = mongoose.Schema;

// create a schema
const visitorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  host: Schema.Types.ObjectId,
  checkIn: { type : Date, default: Date.now },
  checkOut: Date
});
const Visitor = mongoose.model('Visitor', visitorSchema);
module.exports = Visitor;