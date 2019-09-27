import { RLOGIN,RSIGNUP,CLOGIN,CSIGNUP,RUPDATE,CUPDATE, CDISPLAY, RDISPLAY} from "../constants/action-types";
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

export function updateRProfile(payload) {
  console.log("dispatching the action")
  return { type: RUPDATE, payload };
}

export function updateCProfile(payload) {
  console.log("dispatching the action")
  return { type: CUPDATE, payload };
}
