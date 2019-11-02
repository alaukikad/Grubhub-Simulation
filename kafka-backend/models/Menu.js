var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var MenuSchema = new Schema({
  itemname: { type: String, required: true },
  price:{type: Number},
  image:{type: String},
  sid:{type: String},
  email:{type: String},
  desc:{type: String},
  cuisine:{type: String},
  name:{type: String},
  address:{type: String},
  rimage:{type:String}
},
{
    collection:"Menu"
});

var Menu = mongoose.model("Menu", MenuSchema,"Menu");
// self note-the last parameter tells the mongodb server which collection to use ie Customer here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Menu;