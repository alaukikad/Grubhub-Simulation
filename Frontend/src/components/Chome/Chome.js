import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import SearchFood from '../SeachFood/SearchFood';
import hostAddress from '../constants';

class Chome extends Component {
    constructor(props){
        super(props);
        this.state = {  
        }
    }      

    render(){
      
        //if not logged in go to login page
        let redirectVar = null;
       if(!cookie.load('cookie'))
        {
            console.log("Able to read cookie ahjsajhdj");
            redirectVar = <Redirect to= "/login"/>
        }
        if(cookie.load('cookie')=="restaurant"){
            redirectVar = <Redirect to= "/login"/>
        }
        else if(cookie.load('cookie')=="customer")
        {
            redirectVar = <Redirect to= "/chome"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container" style={{borderRadius:"12px"}} >
                <SearchFood/>     
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Chome;