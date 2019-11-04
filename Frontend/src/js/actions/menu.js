import { GET_SECTION,GET_MENU,DELETE_ITEM,DELETE_SECTION,ADD_ITEM,ADD_SECTION,EDIT_ITEM,EDIT_SECTION,hostAddress} from "../constants/action-types";
import axios from 'axios';
//import hostAddress from '../constants';
import cookie from 'react-cookies';

let config = {
  headers:{
      'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
      'Content-Type': 'application/json'
    }
}

export function getSection(payload) {
  console.log("dispatching the action for get section")
let data = {};
return(dispatch)=>{
axios.defaults.withCredentials = true;
//make a post request with the user data
axios.post('http://'+hostAddress+':3001/getSection/getSection',payload,config)
        .then((response) => {
        //update the state with the response data
        console.log("here in Sections")
        console.log(response.data)
        data ={
          secList:response.data
        }
        dispatch({ type: GET_SECTION, data })
        }
    )
}
}

export function getMenu(payload) {
  console.log("dispatching the action for get section")
let data = {};
return(dispatch)=>{
  axios.defaults.withCredentials = true;
  axios.post('http://'+hostAddress+':3001/getMenu/getMenu',payload,config)
  .then((response) => {

        console.log("here in Menu")
 
        data ={
          menu:response.data
        }
        dispatch({ type: GET_MENU, data })
        }
    )
}
}


export function deleteSection(payload) {
  console.log("dispatching the action for delete section")
  let data = {};
  return(dispatch)=>{
        axios.defaults.withCredentials = true;
        axios.post('http://'+hostAddress+':3001/deleteSection/deleteSection',payload,config)
        .then((response) => {
        data ={
          deleteSectionMsg:response.data
        }
        dispatch({ type: DELETE_SECTION, data })
        }
    )
}
}

export function deleteItem(payload) {
  console.log("dispatching the action for delete item")
  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
        axios.post('http://'+hostAddress+':3001/deleteitem/deleteitem',payload,config)
        .then((response) => {
        data ={
          deleteItemMsg:response.data
        }
        dispatch({ type: DELETE_ITEM, data })
        }
    )
}
}



export function addItem(payload) {
  console.log("dispatching the action for add item")
  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
     axios.post('http://'+hostAddress+':3001/additem/additem',payload,config)
     .then(response => {
        data ={
          addItemMsg:response.data
        }
        dispatch({ type: ADD_ITEM, data })
        }
    )
}
}


export function addSection(payload) {
  console.log("dispatching the action for add section")
  let data = {};
  return(dispatch)=>{
    axios.defaults.withCredentials = true;
    axios.post('http://'+hostAddress+':3001/addsection/addsection',payload,config)
    .then(response => {
        //alert(response.data);
        // console.log("Status Code : ",response.status);
        data ={
          addSectionMsg:response.data
        }
        dispatch({ type: ADD_SECTION, data })
        }
    )
}
}


export function editItem(payload) {
  console.log("dispatching the action for edit item")
  let data = {};
  return(dispatch)=>{
     axios.defaults.withCredentials = true;
     axios.post('http://'+hostAddress+':3001/edititem/edititem',payload,config)
     .then(response => {
        data ={
          editItemMsg:response.data
        }
        dispatch({ type: EDIT_ITEM, data })
        }
    )
}
}


export function editSection(payload) {
  console.log("dispatching the action for edit section ")
  let data = {};
  return(dispatch)=>{
   axios.defaults.withCredentials = true;
   axios.post('http://'+hostAddress+':3001/editsection/editsection',payload,config)
   .then(response => {
       alert(response.data);
        data ={
          editSectionMsg:response.data
        }
        dispatch({ type: EDIT_SECTION, data })
        }
    )
}
}



