import { RLOGIN,RSIGNUP,CLOGIN,CSIGNUP,RUPDATE,CUPDATE, CDISPLAY, RDISPLAY,hostAddress} from "../constants/action-types";
import axios from 'axios';
//import hostAddress from '../constants';

export function checkUser(payload) {
  console.log("dispatching the action for customer Login")
let data = {};
return(dispatch)=>{

axios.defaults.withCredentials = true;
//make a post request with the user data
axios.post('http://'+hostAddress+':3001/login/login',payload)
    .then(response => {
    //  alert(response.data.msg);
        console.log("Status Code : ",response.data);
         if(response.data.msg.trim() == "Login Successful"){
            console.log("Hello peps");
            localStorage.setItem("jwtToken",response.data.token)
            data ={
              msg : response.data.msg.trim(),
              name: response.data.name,
              username : payload.username
            }
            dispatch(checkUserNext(data))
        }
    })
    }
}
function checkUserNext(data) {
  return { type: CLOGIN, data }
}

export function registerUser(payload) {
  console.log("dispatching the action")
  return { type: CSIGNUP, payload };
}

export function checkRestaurant(payload) {
  console.log("dispatching the action")
  return { type: RLOGIN, payload };
}

export function registerRestaurant(payload) {
  console.log("dispatching the action")
  return { type: RSIGNUP, payload };
}

export function updateRProfile(payload) {
  console.log("dispatching the action")
  return { type: RUPDATE, payload };
}

export function updateCProfile(payload) {
  console.log("dispatching the action")
  return { type: CUPDATE, payload };
}
