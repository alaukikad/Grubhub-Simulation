import { DELIEVERED_ORDER, CANCELLED_ORDER,PAST_ORDER,PENDING_ORDER,UPCOMING_ORDER} from "../constants/action-types";

const initialState = {
};

function rootReducer(state = initialState, action) {
      if(action.type==DELIEVERED_ORDER){
        console.log("processing in DELIVERED ORDER reducer")
        return Object.assign({},state,{
         deliveredOrder : action.data.deliveredOrders
       })
    }
  
  if(action.type==CANCELLED_ORDER){
    console.log("processing in CANCELLED ORDER reducer")
    return Object.assign({},state,{
     cancelledOrder : action.data.cancelledOrders
   })
  }
  
  if(action.type==PAST_ORDER){
    console.log("processing in PAST ORDER reducer")
    return Object.assign({},state,{
     pastOrder : action.data.pastOrders
   })
  }
  
  if(action.type==UPCOMING_ORDER){
    console.log("processing in UPCOMING ORDER reducer")
    return Object.assign({},state,{
     upcomingOrder : action.data.upcomingOrders
   })
  }
  
  if(action.type==PENDING_ORDER){
    console.log("processing in PENDING ORDER reducer")
    return Object.assign({},state,{
     pendingOrder : action.data.pendingOrders
   })
  }
  
   
    return state;
  }
  
export default rootReducer;



     