import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { emptyUser } from "../middleware/index";

// const store = createStore(rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // let rr;
    const store = createStore(
      rootReducer,
      storeEnhancers(applyMiddleware(emptyUser))
    );
    // console.log("store");
    // console.log(rr);
    
    

    export default store;