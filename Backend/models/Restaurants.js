var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var RestaurantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact:{type: Number},
  address:{type: String},
  zipcode:{type: Number},
  oname:{type: String},
  oimage:{type: String},
  rimage:{type: String},
  city:{type: String},
  cuisine :{type : String}
},
{
    collection:"Restaurants"
});

var Restaurants = mongoose.model("Restaurants", RestaurantSchema,"Restaurants");
module.exports = Restaurants;