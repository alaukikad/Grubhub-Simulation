import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './LandingPage/Navbar';
import Login from './Login/Login';
import Cregister from './Cregister/Cregister';
import Rregister from './Rregister/Rregister';
import Rlogin from './Rlogin/Rlogin';
import Rhome from './Rhome/Rhome';
import Rprofile from './Rprofile/Rprofile';
import Chome from './Chome/Chome';
import Cprofile from './Cprofile/Cprofile';
import Rupdateprofile from './Rupdateprofile/Rupdateprofile'
import Cupdateprofile from './Cupdateprofile /Cupdateprofile'
import Rmenu from './Rmenu/Rmenu';
import Cart from './Cart/Cart';
import MyOrders from './MyOrders/MyOrders'


//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
             
              <Route path="/" component={Navbar}/>
              <Route path="/login" component={Login}/>
              <Route path="/rlogin" component={Rlogin}/>
              <Route path="/cregister" component={Cregister}/>
              <Route path="/rregister" component={Rregister}/>
              <Route path="/rhome" component={Rhome}/>
              <Route path="/chome" component={Chome}/>
              <Route path="/rprofile" component={Rprofile}/>
              <Route path="/cprofile" component={Cprofile}/>
              <Route path="/rupdateprofile" component={Rupdateprofile}/>
              <Route path="/cupdateprofile" component={Cupdateprofile}/>
              <Route path="/rmenu" component={Rmenu}/>
              <Route path="/cart" component={Cart}/>
              <Route path="/myOrders" component={MyOrders}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;