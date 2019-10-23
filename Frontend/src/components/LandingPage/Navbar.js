import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import hostAddress from '../constants';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogout = () => {
        cookie.remove("cookie", { path: '/' })
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        let loadLogin = null;
        let grubhub=null;
        if(cookie.load("cookie")){
          console.log("Able to read cookie");
         
          if(cookie.load("cookie")=="customer"){
            navLogin = (
                
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/cart" ><span class="glyphicon glyphicon-shopping-cart"></span>Cart</Link></li>
                    <li><Link to="/myOrders" ><span class="glyphicon glyphicon-list-alt"></span>Orders</Link></li>
                        <li><Link to="/cprofile" ><span class="glyphicon glyphicon-user"></span>{cookie.load('user')}</Link></li>
                        <li><Link to="/clogin" onClick = {this.handleLogout}><span class="glyphicon glyphicon-log-in"></span>Logout</Link></li>
                </ul>
            );
          }else if(cookie.load("cookie")=="restaurant"){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/rmenu" ><span class="	glyphicon glyphicon-list-alt"></span>Menu</Link></li>
                    <li><Link to="/rprofile" ><span class="glyphicon glyphicon-user"></span>{cookie.load('user')}</Link></li>
                    <li><Link to="/rlogin" onClick = {this.handleLogout}><span class="glyphicon glyphicon-log-in"></span>Logout</Link></li>
                </ul>
            );
        }

        }

        else{
            //Else display login button
           // cookie.remove("cookie", { path: '/' });
            console.log("Not Able to read cookie");
            grubhub= (
            <a class="navbar-brand" href="/login">
               <img alt="Grubhub App" src="https://s2.q4cdn.com/714247563/files/images/brands/grubhub-logo.png" style={{ width:"100px", height:"20px"}}></img>
            </a>
           );
            navLogin = (
                <ul class="nav navbar-nav">
                    <li ><Link to="/login">Customer </Link></li>
                    <li><Link to="/rlogin">Restaurant </Link></li>
                </ul>
            );
            // loadLogin = (  <ul class="nav navbar-nav navbar-right">
            //             <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
            //     </ul>
            // );
        }

        let redirectVar = null;
        // if(cookie.load('cookie')=="customer"){
        //     redirectVar = <Redirect to="/chome"/>
        // }
        // if(cookie.load('cookie')=="restaurant"){
        //     redirectVar = <Redirect to="/rhome"/>
        // }
        // if(!cookie.load('cookie')){
        //     console.log("I am here")
        //    // redirectVar = <Redirect to="/login"/>
        // }

       
        if(cookie.load('cookie')=="restaurant"){
            grubhub= 
            <a class="navbar-brand" href="/rhome">
                <img alt="Grubhub App" src="https://s2.q4cdn.com/714247563/files/images/brands/grubhub-logo.png" style={{ width:"100px", height:"20px"}}></img>
            </a>
        }
        if(cookie.load('cookie')=="customer"){
        grubhub= 
            <a class="navbar-brand" href="/chome">
                <img alt="Grubhub App" src="https://s2.q4cdn.com/714247563/files/images/brands/grubhub-logo.png" style={{ width:"100px", height:"20px"}}></img>
            </a>
        }
       
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-default" >
                <div class="container-fluid">
                    <div class="navbar-header">
                        {grubhub}
                    </div>
                    {navLogin}
                    {loadLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;

// <li><Link to="/home">Sign up</Link></li>