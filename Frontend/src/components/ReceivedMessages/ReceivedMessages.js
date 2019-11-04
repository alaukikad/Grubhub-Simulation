import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import hostAddress from '../constants';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
// import {pastOrder} from '../../js/actions/orders';
// import { connect } from "react-redux";


let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

class SentMessages extends Component {
    constructor(props){
            super(props);
            this.state = {  
                message: []
            }
    }  

    componentDidMount(){
        console.log("I am here")
        const data = {
            email : cookie.load('email')
        }
      
        axios.defaults.withCredentials = true;
        axios.post('http://'+hostAddress+':3001/getMessage/getMessage',data,config)
        .then((response) => {
        console.log(response.data)
        this.setState({
            message : response.data
        })
    })

    }


    render(){
    
    let redirectVar = null;
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/login"/>
    }
    // if(cookie.load('cookie')=="restaurant"){
    //     redirectVar = <Redirect to= "/login"/>
    // }
    let display=[];
    let details = this.state.message.map (msg => {
           console.log(msg);
           console.log(" Yahahhahahahs")
            display.push(<div class="container">
             <br></br>
              <div><b>Restaurant : {msg.receiver}</b></div>
              <div> <small>Date :  {msg.date.substring(0,10)}</small></div>
              <div>
                <h5> {msg.body}</h5>  
              </div>       
          </div>) 
          })
    
        return(
            <div>
                {redirectVar}
                
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                        <h3>Received Messages</h3>
                        
                      {details}
                      {display}
                </div> 
               
            </div> 
        )
    }
}

export default SentMessages;
