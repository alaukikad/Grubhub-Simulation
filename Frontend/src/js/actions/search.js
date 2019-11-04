import { SEARCH_FOOD,CHECKOUT,hostAddress, CONFIRM_ORDER,CANCEL_ORDER} from "../constants/action-types";
import axios from 'axios';
//import hostAddress from '../constants';
import cookie from 'react-cookies';

let config = {
  headers:{
      'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
      'Content-Type': 'application/json'
    }
}

export function searchFood(payload) {
console.log("dispatching the action for search food ")
let data = {};
return(dispatch)=>{
//set the with credentials to true
axios.defaults.withCredentials = true;
axios.post('http://'+hostAddress+':3001/searchfood/searchfood',payload,config)
.then(response => {
  data ={
    searchedRestaurant : response.data
  }
  dispatch({ type: SEARCH_FOOD, data })
        }
    )
  }
}

export function confirmOrder(payload) {
  console.log("dispatching the action for confirm order food ")
  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
    axios.post('http://'+hostAddress+':3001/confirmOrder/confirmOrder',payload,config)
    .then((response) => {
    data ={
      confirmOrderMsg : response.data
    }
    dispatch({ type: CONFIRM_ORDER, data })
          }
      )
    }
  }

  export function checkOut(payload) {
    console.log("dispatching the action for search food ")
    let data = {};
    return(dispatch)=>{
      axios.defaults.withCredentials = true;
      axios.post('http://'+hostAddress+':3001/checkOut/checkOut',payload,config)
      .then((response) => {
      data ={
        checkoutMsg : response.data
      }
      dispatch({ type: CHECKOUT, data })
          }
        )
      }
    }


export function cancelOrder(payload) {
  console.log("dispatching the action for cancel order ")
  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
    axios.post('http://'+hostAddress+':3001/cancelOrder/cancelOrder',payload,config)
    .then((response) => {
    //update the state with the response data
    data ={
      cancelOrderMsg : response.data
    }
    dispatch({ type: CANCEL_ORDER, data })
          }
      )
    }
  }