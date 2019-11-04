var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var MessageSchema = new Schema({
  sender:{type: String},  
  receiver:{type:String},
  date:{type: Date, default: Date.now},
  body:{type:String}
},
{
    collection:"Messages"
});

var Messages = mongoose.model("Messages", MessageSchema,"Messages");
module.exports = Messages;