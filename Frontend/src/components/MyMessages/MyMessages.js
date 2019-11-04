import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ReceivedMessages from '../ReceivedMessages/ReceivedMessages';
import SentMessages from '../SentMessages/SentMessages'
import hostAddress from '../constants';

let messageType=null;

class MyMessages extends Component {
    constructor(props){
            super(props);
            this.state = {  
                cart: []
            }

            this.sentMessages = this.sentMessages.bind(this); 
            this.receivedMessages = this.receivedMessages.bind(this); 

    }  
    //get the books data from backend  
    componentDidMount(){
        console.log(cookie.load("email"));
        console.log("Blehhh");
    }
    
    sentMessages=(value)=>{
        console.log('sent messages');
        messageType="s"
        this.setState({
        })
    }
    receivedMessages=(value)=>{
        console.log('received messages');
        messageType="r"
        this.setState({
        })
    }

    render(){
      
     

        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        // if(cookie.load('cookie')=="restaurant"){
        //     redirectVar = <Redirect to= "/login"/>
        // }
        let goToMessage=null;
        if(messageType=="s")
        {
            goToMessage=<SentMessages/>;
           messageType=null;
       } else if(messageType=="r")
       {
        goToMessage=<ReceivedMessages/>;
           messageType=null;
        }
       

        return(
            <div>
                {redirectVar}
                
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%",borderRadius:"12px"}}>
                    
                    <h2>My Messages</h2>
                    <br></br>

                    <a class="btn btn-primary3" style={{margin:"10px"}} onClick={this.sentMessages.bind(this)}>Sent</a>
                    <a class="btn btn-primary3" style={{margin:"10px"}} onClick={this.receivedMessages.bind(this)}>Received</a>
                    <hr></hr>
                        {goToMessage}
                </div> 
               
            </div> 
        )
    }
}

export default MyMessages;