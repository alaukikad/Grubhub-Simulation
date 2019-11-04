import { DELIEVERED_ORDER,CANCELLED_ORDER,PAST_ORDER,UPCOMING_ORDER,PENDING_ORDER,hostAddress} from "../constants/action-types";
import axios from 'axios';
//import hostAddress from '../constants';
import cookie from 'react-cookies';

let config = {
  headers:{
      'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
      'Content-Type': 'application/json'
    }
}

export function delieveredOrder(payload) {
  console.log("dispatching the action for delivered orders")

  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
    axios.post('http://'+hostAddress+':3001/deliveredOrder/deliveredOrder',payload,config)
    .then((response) => {
            data ={
              deliveredOrders : response.data
            }
            dispatch({ type: DELIEVERED_ORDER, data })
  
    })
    }
}

export function upcomingOrder(payload) {
  console.log("dispatching the action for upcoming orders")
  console.log(config)
  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
        axios.post('http://'+hostAddress+':3001/upcomingOrder/upcomingOrder',payload, config)
        .then((response) => {
            data ={
              upcomingOrders : response.data
            }
            dispatch({ type: UPCOMING_ORDER, data })
  
    })
    }
}

export function pastOrder(payload) {
  console.log("dispatching the action for past orders")
  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
        axios.post('http://'+hostAddress+':3001/pastOrder/pastOrder',payload,config)
        .then((response) => {
            data ={
              pastOrders : response.data
            }
            dispatch({ type: PAST_ORDER, data })
  
    })
    }
}


export function cancelledOrder(payload) {
  console.log("dispatching the action for cancelled orders")
  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
        axios.post('http://'+hostAddress+':3001/cancelledOrder/cancelledOrder',payload,config)
        .then((response) => {
            data ={
              cancelledOrders : response.data
            }
            dispatch({ type: CANCELLED_ORDER, data })
    })
    }
}

export function pendingOrder(payload) {
  console.log("dispatching the action for pending orders")
  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
        axios.post('http://'+hostAddress+':3001/pendingOrder/pendingOrder',payload,config)
        .then((response) => {
            data ={
              pendingOrders : response.data
            }
            dispatch({ type: PENDING_ORDER, data })
  
    })
    }
}