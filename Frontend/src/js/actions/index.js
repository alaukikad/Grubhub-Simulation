import { RLOGIN,RSIGNUP,CLOGIN,CSIGNUP,RUPDATE,CUPDATE,RPROFILE,CPROFILE,hostAddress} from "../constants/action-types";
import axios from 'axios';
//import hostAddress from '../constants';
import cookie from 'react-cookies';

let config = {
  headers:{
      'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
      'Content-Type': 'application/json'
    }
}

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
        }
        data ={
          msg : response.data.msg.trim(),
          name: response.data.name,
          username : payload.username
        }
        dispatch({ type: CLOGIN, data })
    })
    }
}

export function checkRestaurant(payload) {
  console.log("dispatching the action for restaurant Login")
  console.log(payload);
  let data = {};
  return(dispatch)=>{
       axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://'+hostAddress+':3001/rlogin/rlogin',payload)
        .then(response => {
          //alert(response.data.resmsg);
          console.log("Status Code : ",response.data);
          if(response.data.resmsg.trim() == "Login Successful"){
              console.log("Hello peps I'm in R login logged in");
               localStorage.setItem("jwtToken",response.data.token)
          }
          data ={
            msg : response.data.resmsg.trim(),
            name: response.data.name,
            username : payload.username
          }
          dispatch({ type: RLOGIN, data })
      })
  }
}
 
export function registerUser(payload) {
  console.log("dispatching the action for customer register")
  let data = {};
  return(dispatch)=>{ 

//set the with credentials to true
axios.defaults.withCredentials = true;
//make a post request with the user data
axios.post('http://'+hostAddress+':3001/cregister/cregister',payload)
.then(response => {
alert(response.data.resmsg);
console.log("Status Code  : ",response.status);
if(response.data.resmsg.trim() == "User Added Successfully!"){
console.log("Hello New User!");
cookie.save("cookie","customer",{maxAge: 900000, httpOnly: false, path : '/'});
cookie.save("user",payload.fullname,{maxAge: 900000, httpOnly: false, path : '/'});
cookie.save("email",payload.email,{maxAge: 900000, httpOnly: false, path : '/'});
localStorage.setItem("jwtToken",response.data.token);
data ={
    msg : response.data.resmsg.trim(),
    email : payload.email,
    fullname: payload.fullname,
    contact: payload.contact,
    address : payload.address,
}
dispatch({ type: CSIGNUP, data })
}
})
    
   }
}

export function registerRestaurant(payload) {
  console.log("dispatching the action for restaurant register")
  let data = {};
  return(dispatch)=>{ 
  axios.defaults.withCredentials = true;
     //make a post request with the user data
     axios.post('http://'+hostAddress+':3001/rregister/rregister',payload)
     .then(response => {
         alert(response.data.resmsg);
         console.log("Status Code : ",response.status);
         if(response.data.resmsg.trim() == "Restaurant Added Successfully!"){
           console.log("Hello New Restaurant");
           localStorage.setItem("jwtToken",response.data.token);
           cookie.save("cookie","restaurant",{maxAge: 900000, httpOnly: false, path : '/'});
           cookie.save("user",payload.restaurant,{maxAge: 900000, httpOnly: false, path : '/'});
           cookie.save("email",payload.email,{maxAge: 900000, httpOnly: false, path : '/'});
           data ={
               msg : response.data.resmsg.trim(),
               cuisine : payload.cuisine,
                email : payload.email,
                fullname: payload.oname,
                contact: payload.contact,
                address : payload.address,
                city : payload.city,
                zipcode : payload.zipcode,
                restaurant : payload.restaurant,
          }
          dispatch({ type: RSIGNUP, data })
         }
        })
   }
}

export function getRestaurantData(payload) {
  console.log("dispatching the action for restaurant profile")
  let data = {};
  return(dispatch)=>{
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://'+hostAddress+':3001/rprofile/rprofile',payload,config)
                .then((response) => {   
                data={
                rid : response.data.rid,
                cuisine : response.data.cuisine,
                email : response.data.email,
                fullname: response.data.oname,
                contact: response.data.contact,
                address : response.data.address,
                city : response.data.city,
                zipcode : response.data.zipcode,
                restaurant : response.data.name,
                oimage : "http://"+hostAddress+":3001/images/all/" + response.data.oimage+ "",
                rimage : "http://"+hostAddress+":3001/images/all/" + response.data.rimage+ ""
                };
                dispatch({ type: RPROFILE, data })
            });
  }
}

export function getUserData(payload) {
  console.log("dispatching the action for customer profile Login")
  let data = {};
  return(dispatch)=>{
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://'+hostAddress+':3001/cprofile/cprofile',payload,config)
                .then((response) => {   
                data={
                email : response.data.email,
                fullname: response.data.name,
                contact: response.data.contact,
                address : response.data.address,
                oimage : "http://"+hostAddress+":3001/images/all/" + response.data.image+ ""
                };
                dispatch({ type: CPROFILE, data })
            });
  }
}



export function updateRProfile(payload) {
  console.log("dispatching the action for restaurant profile update")
  let data = {};
  return(dispatch)=>{
  
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://'+hostAddress+':3001/rprofileupdate/rprofileupdate',payload,config)
    .then(response => {
    console.log("Status Code : ",response.data);
    if(response.data.trim() == "Details Updated!"){
        console.log("Hello peps I'm in R profile updatereducer");
        data={
          rid : response.data.rid,
          email: response.data.email,
          fullname: response.data.oname,
          contact: response.data.contact,
          address : response.data.address,
          city : response.data.city,
          cuisine : response.data.cuisine,
          zipcode : response.data.zipcode,
          restaurant : response.data.name,
          msg: "Details Updated!",
          oimage : "http://"+hostAddress+":3001/images/all/" + response.data.oimage+ "",
          rimage : "http://"+hostAddress+":3001/images/all/" + response.data.rimage+ ""
          };
        dispatch({ type: RUPDATE, data })
      }
   
      });
  }

}

export function updateCProfile(payload) {
  console.log("dispatching the action")
  return { type: CUPDATE, payload };
}
