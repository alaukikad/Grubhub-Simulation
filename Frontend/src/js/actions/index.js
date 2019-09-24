import { RLOGIN,RSIGNUP,CLOGIN,CSIGNUP} from "../constants/action-types";
export function checkUser(payload) {
  console.log("dispatching the action")
  return { type: CLOGIN, payload };
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