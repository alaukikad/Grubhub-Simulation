var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderDetails=require('./OrderDetails');
// create a schema
var OrderSchema = new Schema({
  price:{type: Number},
  status:{type: String},
  uid:{type: String},
  rid:{type: String},
  uname:{type: String},
  uaddress:{type:String},
  rname:{type:String},
  orderDetails:{type:Array}
},
{
    collection:"Orders"
});

var Orders = mongoose.model("Orders", OrderSchema,"Orders");
module.exports = Orders;