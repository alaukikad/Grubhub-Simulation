var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var OrderDetailSchema = new Schema({
  oid:{type: String},  
  itemname:{type:String},
  price:{type: Number},
  qty:{type:Number},
  status:{type: String},
  uid:{type: String},
  rid:{type: String},
  rname:{type:String}
},
{
    collection:"OrderDetails"
});

var OrderDetails = mongoose.model("OrderDetails", OrderDetailSchema,"OrderDetails");
module.exports = OrderDetails;