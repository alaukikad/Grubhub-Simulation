import { RLOGIN,RSIGNUP,CLOGIN,CSIGNUP,RPROFILE,CPROFILE, DELIEVERED_ORDER, CANCELLED_ORDER,PAST_ORDER,PENDING_ORDER,UPCOMING_ORDER, SEARCH_FOOD,GET_SECTION,GET_MENU,CHECKOUT, CONFIRM_ORDER, CANCEL_ORDER, ADD_ITEM,ADD_SECTION,DELETE_ITEM,DELETE_SECTION,EDIT_ITEM,EDIT_SECTION, GET_SENT_MESSAGE,GET_MESSAGE  } from "../constants/action-types";
import axios from 'axios';

const initialState = {
  cloginMsg:null,
  rloginMsg:null,
  email :""
};

function rootReducer(state = initialState, action) {
    if (action.type === CLOGIN) {
      console.log("processing in CLOGIN reducer");
           return Object.assign({},state,{
            email : action.data.username,
            user : action.data.name,
            cloginMsg : action.data.msg
          })
    }
    if (action.type === RLOGIN) {
        console.log("processing in RLOGIN reducer")
        return Object.assign({},state,{
         email : action.data.username,
         user : action.data.name,
         rloginMsg : action.data.msg
      }
  )}
    
  if(action.type === RPROFILE){
    console.log("processing in RPROFILE reducer")
    return Object.assign({},state,{
      rid : action.data.rid,
      cuisine : action.data.cuisine,
      email : action.data.email,
      fullname: action.data.fullname,
      contact: action.data.contact,
      address : action.data.address,
      city : action.data.city,
      zipcode : action.data.zipcode,
      restaurant : action.data.restaurant,
      oimage : action.data.oimage,
      rimage : action.data.rimage
    })
  }

  if(action.type === CPROFILE){
    console.log("processing in CPROFILE reducer")
    return Object.assign({},state,{
      email : action.data.email,
      fullname: action.data.fullname,
      contact: action.data.contact,
      address : action.data.address,
      oimage : action.data.oimage
    })
  }

  if(action.type === RSIGNUP){
    console.log("processing in RSIGNUP reducer")
        return Object.assign({},state,{
        cuisine : action.data.cuisine,
        email : action.data.email,
        fullname: action.data.fullname,
        contact: action.data.contact,
        address : action.data.address,
        city : action.data.city,
        zipcode : action.data.zipcode,
        restaurant : action.data.restaurant,
        rSignupmsg : action.data.msg
        })
    }
    if(action.type === CSIGNUP){
      console.log("processing in RSIGNUP reducer")
     return Object.assign({},state,{
       email : action.data.email,
       fullname: action.data.fullname,
       contact: action.data.contact,
       address : action.data.address,
       cSignupmsg : action.data.msg
     })
     }

      //   if(action.type === RUPDATE){
      //     console.log("processing in RUPDATE reducer")
          
      // return Object.assign({},state,{
      // rid : action.data.rid,
      // cuisine : action.data.cuisine,
      // email : action.data.email,
      // fullname: action.data.fullname,
      // contact: action.data.contact,
      // address : action.data.address,
      // city : action.data.city,
      // zipcode : action.data.zipcode,
      // updateMsg:action.data.msg,
      // restaurant : action.data.restaurant,
      // oimage : action.data.oimage,
      // rimage : action.data.rimage
        
      //  })
      // }

    
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

  if(action.type==DELETE_ITEM){
    console.log("processing in DELETE ITEM  reducer")
    return Object.assign({},state,{
      deleteItemMsg : action.data.deleteItemMsg
   })
  }

  if(action.type==DELETE_SECTION){
    console.log("processing in DELETE SECTION reducer")
    return Object.assign({},state,{
      deleteSectionMsg : action.data.deleteSectionMsg
   })
  }

  if(action.type==ADD_ITEM){
    console.log("processing in ADD ITEM  reducer")
    return Object.assign({},state,{
      addItemMsg : action.data.addItemMsg
   })
  }
  if(action.type==ADD_SECTION){
    console.log("processing in ADD SECTION  reducer")
    return Object.assign({},state,{
      addSectionMsg : action.data.addSectionMsg
   })
  }
  if(action.type==EDIT_ITEM){
    console.log("processing in EDIT ITEM  reducer")
    return Object.assign({},state,{
      editItemMsg : action.data.editItemMsg
   })
  }
  if(action.type==EDIT_SECTION){
    console.log("processing in EDIT SECTION reducer")
    return Object.assign({},state,{
      editSectionMsg : action.data.editSectionMsg
   })
  }

  if(action.type==GET_MESSAGE){
    console.log("processing in GET MESSAGE reducer")
    return Object.assign({},state,{
      receivedMessage : action.data.responseMessage
   })
  }

  if(action.type==GET_SENT_MESSAGE){
    console.log("processing in GET SENT MESSAGE reducer")
    return Object.assign({},state,{
      sentMessage : action.data.responseMessage
   })
  }

   
    return state;
  }
  
export default rootReducer;



     