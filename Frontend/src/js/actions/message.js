import { GET_MESSAGE,GET_SENT_MESSAGE,hostAddress} from "../constants/action-types";
import axios from 'axios';
//import hostAddress from '../constants';
import cookie from 'react-cookies';

let config = {
  headers:{
      'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
      'Content-Type': 'application/json'
    }
}

export function getSentMessage(payload) {
  console.log("dispatching the action for get sent message section")
let data = {};
return(dispatch)=>{
    axios.defaults.withCredentials = true;
    axios
      .post(
        "http://" + hostAddress + ":3001/getSentMessage/getSentMessage",
        payload,
        config
      )
      .then(response => {
        console.log(response.data);
        //update the state with the response data
        data ={
          responseMessage:response.data
        }
        dispatch({ type: GET_SENT_MESSAGE, data })
        }
    )
}
}

export function getMessage(payload) {
    console.log("dispatching the action for get  message section")
  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
    axios
      .post(
        "http://" + hostAddress + ":3001/getMessage/getMessage",
        payload,
        config
      )
        .then(response => {
            console.log("I am here")
          console.log(response.data);
          //update the state with the response data
          data ={
            responseMessage:response.data
          }
          dispatch({ type: GET_MESSAGE, data })
          }
      )
  }
  }
