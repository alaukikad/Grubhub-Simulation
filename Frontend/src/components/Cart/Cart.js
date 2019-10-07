import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

let price=0;
let restName="";
let restID=0;
let goToOrders=false;
let goToHome=false;
let cartClear=false;

class Cart extends Component {
    constructor(props){
            super(props);
            this.state = {  
                cart: []
            }
            this.confirmOrder = this.confirmOrder.bind(this); 
            this.cancelOrder = this.cancelOrder.bind(this); 
    }  
    //get the books data from backend  
    componentDidMount(){
        console.log(cookie.load("email"));
        console.log("Blehhh");
        const data = {
            email : cookie.load("email")
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.post('http://54.196.229.70:3001/getCart/getCart',data)
                .then((response) => {             
                this.setState({
                cart : this.state.cart.concat(response.data)              
                });
              
                   
            });
    }
    
    confirmOrder=(e)=>{
        console.log("Inside Confirm 1")
        const data = {
            cart : this.state.cart,
            email : cookie.load('email'),
            total : price,
            rid : restID
        }
        
        axios.defaults.withCredentials = true;
        axios.post('http://54.196.229.70:3001/confirmOrder/confirmOrder',data)
        .then((response) => {
        //update the state with the response data
         goToOrders=true;
        this.setState({   
        });
        console.log("Inside Confirm")
    });
    }

    cancelOrder=(e)=>{
        console.log("Inside Can 1")
        const data = {
            email : cookie.load('email'),
            total : price,
            rid : restID
        }
        
        axios.defaults.withCredentials = true;
        axios.post('http://54.196.229.70:3001/cancelOrder/cancelOrder',data)
        .then((response) => {
        //update the state with the response data
        alert(response.data)
         goToHome=true;
         cartClear=true;
        this.setState({   
        });
        console.log("Inside cancel")
    });
    }

    render(){
      
       // let redirectProf = <Li to= "/rupdateprofile"/>;
       let details = this.state.cart.map(order => {
        restName=order.name;  
        restID=order.rid;   
        price+=order.price;
        return(
            <tr>
                <td>{order.itemname}</td>
                <td>{order.qty}</td>
                <td>$ {order.price}</td>
            </tr>
        )
    })

        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(cookie.load('cookie')=="restaurant"){
            redirectVar = <Redirect to= "/login"/>
        }
        let goForward=null;
        if(goToOrders){
           goForward = <Redirect to= "/myOrders"/>
          }
          let goHome=null;
          if(goToHome){
              goToHome=false;
              goHome = window.location.reload();
            }
            
        return(
            <div>
                {redirectVar}
                {goForward}
                {goHome}
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%",borderRadius:"12px"}}>
                    
                    <h2>My Cart</h2>
                    <h3><b>{restName}</b></h3>
                        <table class="table">
                        <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                              {details}
                              <tr>
                <td><b>Total Price:</b></td>
                <td></td>
                <td><b>$ {price}</b></td>
            </tr>
                            </tbody>
                        </table>

                       
                        
                        <a class="btn btn-primary4" style={{margin:"10px", Backgroundcolor:"green"}} onClick={this.confirmOrder.bind(this)}>Confirm Order</a>
                        <a class="btn btn-primary3" style={{margin:"10px"}} onClick={this.cancelOrder.bind(this)}>Cancel Order</a>
                        <br></br>
                </div> 
               
            </div> 
        )
    }
}

export default Cart;