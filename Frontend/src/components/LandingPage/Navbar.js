import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove("cookie", { path: '/' })
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        let loadLogin = null;
        if(cookie.load("cookie")){
          console.log("Able to read cookie");
          if(cookie.load("cookie")=="customer"){
            navLogin = (
                
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/cprofile" ><span class="glyphicon glyphicon-user"></span>Profile</Link></li>
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-log-in"></span>Logout</Link></li>
                </ul>
            );
          }else if(cookie.load("cookie")=="restaurant"){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/rprofile" ><span class="glyphicon glyphicon-user"></span>Profile</Link></li>
                        <li><Link to="/rprofile" onClick = {this.handleLogout}><span class="glyphicon glyphicon-log-in"></span>Logout</Link></li>
                </ul>
            );
        }
        }
        else{
            //Else display login button
           // cookie.remove("cookie", { path: '/' });
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav">
                    <li class="active"><Link to="/login">Customer </Link></li>
                    <li><Link to="/rlogin">Restaurant </Link></li>
                </ul>
            );
            loadLogin = (  <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            );
        }
        let redirectVar = null;
        if(cookie.load('cookie')=="customer"){
            redirectVar = <Redirect to="/chome"/>
        }
        if(cookie.load('cookie')=="restaurant"){
            redirectVar = <Redirect to="/rhome"/>
        }
        if(!cookie.load('cookie')){
            console.log("I am here")
           // redirectVar = <Redirect to="/login"/>
        }
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="/">Grubhub App</a>
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