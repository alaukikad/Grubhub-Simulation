var connection =  new require('./kafka/Connection');
var database=new require('./database.js')

//topics files
var Cprofile=require('./services/cprofile');
var AddItem=require('./services/addItem');
var AddSection=require('./services/addSection');
var CancelledOrder=require('./services/cancelledOrder');
var CancelOrder=require('./services/cancelOrder');
var CheckOut=require('./services/checkOut');
var ConfirmOrder=require('./services/confirmOrder');
var CprofileUpdate=require('./services/cprofileupdate');
var Cregister=require('./services/cregister');
var DeleteItem=require('./services/deleteItem');
var DeleteSection=require('./services/deleteSection');
var DeliveredOrder=require('./services/deliveredOrder');
var EditItem=require('./services/editItem');
var EditSection=require('./services/editSection');
var GetCart=require('./services/getCart');
var GetCuisine=require('./services/getCuisine');
var GetItem=require('./services/getItem');
var GetMenu=require('./services/getMenu');
var GetSection=require('./services/getSection');
var GetSectionFromID=require('./services/getSectionFromID');
var Login=require('./services/login');
var PastOrder=require('./services/pastOrder');
var PendingOrder=require('./services/pendingOrder');
var Rlogin=require('./services/rlogin');
var Rprofile=require('./services/rprofile');
var RprofileUpdate=require('./services/rprofileupdate');
var Rregister=require('./services/rregister');
var SearchFood=require('./services/searchFood');
var UpcomingOrder=require('./services/upcomingOrder');
var UpdateOrderStatus=require('./services/updateOrderStatus');
var SendMessage=require('./services/sendMessage');
var GetMessage=require('./services/getMessage');
var GetSentMessage=require('./services/getSentMessage');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest("cprofile",Cprofile);
handleTopicRequest("add_item",AddItem);
handleTopicRequest("add_section",AddSection);
handleTopicRequest("cancelled_order",CancelledOrder);
handleTopicRequest("cancel_order",CancelOrder);
handleTopicRequest("confirm_order",ConfirmOrder);
handleTopicRequest("cprofile_update",CprofileUpdate);
handleTopicRequest("delete_item",DeleteItem);
handleTopicRequest("cregister",Cregister);
handleTopicRequest("checkout",CheckOut);
handleTopicRequest("delete_section",DeleteSection);
handleTopicRequest("delivered_order",DeliveredOrder);
handleTopicRequest("edit_item",EditItem);
handleTopicRequest("edit_section",EditSection);
handleTopicRequest("get_cart",GetCart);
handleTopicRequest("get_cuisine",GetCuisine);
handleTopicRequest("get_item",GetItem);
handleTopicRequest("get_menu",GetMenu);
handleTopicRequest("get_section",GetSection);
handleTopicRequest("get_section_from_id",GetSectionFromID);
handleTopicRequest("login",Login);
handleTopicRequest("past_order",PastOrder);
handleTopicRequest("pending_order",PendingOrder);
handleTopicRequest("rlogin",Rlogin);
handleTopicRequest("rprofile",Rprofile);
handleTopicRequest("rprofile_update",RprofileUpdate);
handleTopicRequest("rregister",Rregister);
handleTopicRequest("search_food",SearchFood);
handleTopicRequest("upcoming_order",UpcomingOrder);
handleTopicRequest("update_order_status",UpdateOrderStatus);
handleTopicRequest("send_message",SendMessage);
handleTopicRequest("get_message",GetMessage);
handleTopicRequest("get_sent_message",GetSentMessage);