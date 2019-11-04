import { SEARCH_FOOD,GET_SECTION,GET_MENU,CHECKOUT, CONFIRM_ORDER, CANCEL_ORDER } from "../constants/action-types";
import axios from 'axios';

const initialState = {

};

function rootReducer(state = initialState, action) {
  
  if(action.type==SEARCH_FOOD){
    console.log("processing in SEARCH FOOD reducer")
    return Object.assign({},state,{
     searchedRestaurant : action.data.searchedRestaurant
   })
  }

  if(action.type==GET_SECTION){
    console.log("processing in GET SECTION  reducer")
    return Object.assign({},state,{
     secList : action.data.secList
   })
  }

  if(action.type==GET_MENU){
    console.log("processing in GET MENU  reducer")
    return Object.assign({},state,{
     menu : action.data.menu
   })
  }

  if(action.type==CHECKOUT){
    console.log("processing in CHECKOUT  reducer")
    return Object.assign({},state,{
     checkoutMsg : action.data.checkoutMsg
   })
  }

  if(action.type==CONFIRM_ORDER){
    console.log("processing in CONFIRM ORDER  reducer")
    return Object.assign({},state,{
     confirmOrderMsg : action.data.confirmOrderMsg
   })
  }

  if(action.type==CANCEL_ORDER){
    console.log("processing in CANCEL ORDER  reducer")
    return Object.assign({},state,{
     cancelOrderMsg : action.data.cancelOrderMsg
   })
  }

   
    return state;
  }
  
export default rootReducer;



     