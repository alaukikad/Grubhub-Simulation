var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CuisineSchema = new Schema({
  name: { type: String, required: true }
},
{
    collection:"Cuisines"
});

var Cuisines = mongoose.model("Cuisines", CuisineSchema,"Cuisines");
// self note-the last parameter tells the mongodb server which collection to use ie Customer here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Cuisines;