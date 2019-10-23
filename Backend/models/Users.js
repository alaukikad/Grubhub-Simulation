var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact:{type: Number},
  address:{type: String},
  image:{type:String}
},
{
    collection:"Users"
});

var Users = mongoose.model("Users", UserSchema,"Users");
// the last parameter tells the mongodb server which collection to use ie User here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Users;