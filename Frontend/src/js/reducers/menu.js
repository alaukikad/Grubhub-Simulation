import { GET_MENU,ADD_ITEM,ADD_SECTION,DELETE_ITEM,DELETE_SECTION,EDIT_ITEM,EDIT_SECTION  } from "../constants/action-types";
import axios from 'axios';

const initialState = {
  cloginMsg:null,
  rloginMsg:null,
  email :""
};

function rootReducer(state = initialState, action) {
    

  if(action.type==GET_MENU){
    console.log("processing in GET MENU  reducer")
    return Object.assign({},state,{
     menu : action.data.menu
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
    return state;
  }
  
export default rootReducer;



     