import { RLOGIN,RSIGNUP,CLOGIN,CSIGNUP } from "../constants/action-types";

export function emptyUser({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === CLOGIN) {
        console.log("I am in middleware");
        let foundWord;
          if(action.payload.username== "" || action.payload.password == ""){
            foundWord =false;
        }
        if (foundWord) {
          return dispatch({ type:"EMPTY_FIELDS" });
        }
      }
      if (action.type === CSIGNUP) {
        console.log("I am in middleware");
        let foundWord;
          if(action.payload.username== "" || action.payload.password == ""){
            foundWord =false;
        }
        if (foundWord) {
          return dispatch({ type:"EMPTY_FIELDS" });
        }
      }
      if (action.type === RLOGIN) {
        console.log("I am in middleware");
        let foundWord;
          if(action.payload.username== "" || action.payload.password == ""){
            foundWord =false;
        }
        if (foundWord) {
          return dispatch({ type:"EMPTY_FIELDS" });
        }
      }if (action.type === RSIGNUP) {
        console.log("I am in middleware");
        let foundWord;
          if(action.payload.username== "" || action.payload.password == ""){
            foundWord =false;
        }
        if (foundWord) {
          return dispatch({ type:"EMPTY_FIELDS" });
        }
      }

      return next(action);
    };
  };
}