var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var SectionSchema = new Schema({
  name: { type: String, required: true },
  rid: { type: String, required: true }
},
{
    collection:"Sections"
});

var Sections = mongoose.model("Sections", SectionSchema,"Sections");
module.exports = Sections;