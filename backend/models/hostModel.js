var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/visitor-management', function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

const Schema = mongoose.Schema;

// create a schema
const hostSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  mobile: String,
  address: String
});
const Host = mongoose.model('Host', hostSchema);
module.exports = Host;