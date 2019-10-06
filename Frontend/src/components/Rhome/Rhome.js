import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import DeliveredOrder from '../DeliveredOrder/DeliveredOrder';
import PendingOrder from '../PendingOrder/PendingOrder';
import CancelledOrder from '../CancelledOrder/CancelledOrder';

let orderType=null;

class Rhome extends Component {
    constructor(props){
            super(props);
            this.state = {  
                cart: []
            }

            this.deliveredOrder = this.deliveredOrder.bind(this); 
            this.pendingOrder = this.pendingOrder.bind(this); 
            this.cancelledOrder = this.cancelledOrder.bind(this); 

    }  
    //get the books data from backend  
    componentDidMount(){
        console.log(cookie.load("email"));
    }
    
    pendingOrder=(value)=>{
        console.log('pending order');
        orderType="p"
        this.setState({
        })
    }
    cancelledOrder=(value)=>{
        console.log('cancelled order');
        orderType="c"
        this.setState({
        })
    }

    deliveredOrder=(value)=>{
        console.log('delivered order');
        orderType="d"
        this.setState({
        })
    }

    render(){
      
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        if(cookie.load('cookie')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        
        let goToOrder=null;
        if(orderType=="p")
        {
           goToOrder=<PendingOrder/>
           orderType=null;
           
       } else if(orderType=="c")
       {
           goToOrder=<CancelledOrder/>;
           orderType=null;
           
        }else  if(orderType=="d")
        {
           goToOrder=<DeliveredOrder/>;
           orderType=null;
           
       }
       

        return(
            <div>
                {redirectVar}
                
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%",borderRadius:"12px"}}>
                    
                    <h2>Restaurant Orders</h2>
                    <br></br>

                    <a class="btn btn-primary3" style={{margin:"10px"}} onClick={this.pendingOrder.bind(this)}>Pending Orders</a>
                    <a class="btn btn-primary3" style={{margin:"10px"}} onClick={this.deliveredOrder.bind(this)}>Delivered Orders</a>
                    <a class="btn btn-primary3" style={{margin:"10px"}} onClick={this.cancelledOrder.bind(this)}>Cancelled Orders</a>
                    <hr></hr>
                        {goToOrder}
                </div> 
               
            </div> 
        )
    }
}

export default Rhome;