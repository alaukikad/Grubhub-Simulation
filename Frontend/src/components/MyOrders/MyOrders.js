import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import UpcomingOrder from '../UpcomingOrder/UpcomingOrder';
import PastOrders from '../PastOrders/PastOrders'

let orderType=null;

class MyOrders extends Component {
    constructor(props){
            super(props);
            this.state = {  
                cart: []
            }

            this.upcomingOrder = this.upcomingOrder.bind(this); 
            this.pastOrder = this.pastOrder.bind(this); 

    }  
    //get the books data from backend  
    componentDidMount(){
        console.log(cookie.load("email"));
        console.log("Blehhh");
    }
    
    upcomingOrder=(value)=>{
        console.log('upcomg order');
        orderType="u"
        this.setState({
        })
    }
    pastOrder=(value)=>{
        console.log('past order');
        orderType="p"
        this.setState({
        })
    }

    render(){
      
     

        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        
        let goToOrder=null;
        if(orderType=="u")
        {
           goToOrder=<UpcomingOrder></UpcomingOrder>;
           orderType=null;
       } else if(orderType=="p")
       {
           goToOrder=<PastOrders></PastOrders>;
           orderType=null;
        }
       

        return(
            <div>
                {redirectVar}
                
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%",borderRadius:"12px"}}>
                    
                    <h2>My Orders</h2>
                    <br></br>

                    <a class="btn btn-primary3" style={{margin:"10px"}} onClick={this.upcomingOrder.bind(this)}>Upcoming Orders</a>
                    <a class="btn btn-primary3" style={{margin:"10px"}} onClick={this.pastOrder.bind(this)}>Past Orders</a>
                    <hr></hr>
                        {goToOrder}
                </div> 
               
            </div> 
        )
    }
}

export default MyOrders;