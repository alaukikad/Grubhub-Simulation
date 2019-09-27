import { RLOGIN,RSIGNUP,CLOGIN,CSIGNUP, RUPDATE, CUPDATE  } from "../constants/action-types";
import axios from 'axios';

const initialState = {
  username :"",
  password :""
};
// function rootReducer(state = initialState, action) {
//   if (action.type === ADD_BOOK) {
//     state.books.push(action.payload);
//   }
//   return state;
// }
function rootReducer(state = initialState, action) {
    if (action.type === CLOGIN) {
      console.log("processing in reducer")
       //set the with credentials to true
       axios.defaults.withCredentials = true;
       //make a post request with the user data
       axios.post('http://localhost:3001/login',action.payload)
           .then(response => {
            alert(response.data);
               console.log("Status Code : ",response.data);
                if(response.data.trim() == "Login Successful"){
                   console.log("Hello peps");
                   localStorage.setItem("user",action.payload.username);
                   console.log(Object.assign({},state,{
                    username : action.payload.username,
                    password : action.payload.password
                  }))
               }
           })
           return Object.assign({},state,{
            username : action.payload.username,
            password : action.payload.password
          })
         /*  .catch(response=>{
               alert("Some error!!")

           });*/
    }
    if (action.type === RLOGIN) {
        console.log("processing in reducer")

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/rlogin',action.payload)
        .then(response => {
          alert(response.data);
          console.log("Status Code : ",response.data);
          if(response.data.trim() == "Login Successful"){
              console.log("Hello peps I'm in R login reducer");
              localStorage.setItem("user",action.payload.username);
          }else{
                  alert("Invalid Credentials!!")
          }  
      })
      return Object.assign({},state,{
        username : action.payload.username,
        password : action.payload.password
      }
  )}
       
  if(action.type === RSIGNUP){
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data

    axios.post('http://localhost:3001/rregister',action.payload)
    .then(response => {
        alert(response.data);
        console.log("Status Code : ",response.status);
        if(response.data.trim() == "Restaurant Added Successfully!"){
          console.log("Hello peps23");
          localStorage.setItem("user",action.payload.email);
        }
    })
        return Object.assign({},state,{
          email : action.payload.email,
          password : action.payload.password,
          fullname: action.payload.fullname,
          contact: action.payload.contact,
          address : action.payload.address
        })
        }


        if(action.type === RUPDATE){
          console.log("processing in reducer")
          //set the with credentials to true
          axios.defaults.withCredentials = true;
          //make a post request with the user data
          axios.post('http://localhost:3001/rprofileupdate',action.payload)
          .then(response => {
          alert(response.data);
          console.log("Status Code : ",response.data);
          if(response.data.trim() == "Details Updated!"){
              console.log("Hello peps I'm in R profile updatereducer");
              localStorage.setItem("user",action.payload.email);
            }
              
      })
      return Object.assign({},state,{
        username : action.payload.email,
        
       })
      }

        if(action.type === CUPDATE){
          console.log("processing in reducer")
          //set the with credentials to true
          axios.defaults.withCredentials = true;
          //make a post request with the user data
          axios.post('http://localhost:3001/cprofileupdate',action.payload)
          .then(response => {
          alert(response.data);
          console.log("Status Code : ",response.data);
          if(response.data.trim() == "Details Updated!"){
              console.log("Hello peps I'm in C profile updatereducer");
              localStorage.setItem("user",action.payload.email);
            }
              
      })
      return Object.assign({},state,{
        username : action.payload.email,
        
      }
  )
        }


    if(action.type === CSIGNUP){
//set the with credentials to true
axios.defaults.withCredentials = true;
//make a post request with the user data
axios.post('http://localhost:3001/cregister',action.payload)
    .then(response => {
      alert(response.data);
        console.log("Status Code blyi : ",response.status);
        if(response.data.trim() == "User Added Successfully!"){
          localStorage.setItem("user",action.payload.email);
          console.log("Hello peps23");
        }
    })
    return Object.assign({},state,{
      email : action.payload.email,
      password : action.payload.password,
      fullname: action.payload.fullname,
      contact: action.payload.contact,
      address : action.payload.address
    })
    }
    return state;
  }
  
export default rootReducer;



     