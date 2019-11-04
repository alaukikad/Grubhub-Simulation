import React, {Component} from 'react';
import '../../App.css';
// import axios from 'axios';
// import hostAddress from '../constants';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {pastOrder} from '../../js/actions/orders';
import { connect } from "react-redux";

let orderList;
let total=[];
let c=-1;
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

class PastOrders extends Component {
    constructor(props){
            super(props);
            orderList=new Map();
            this.state = {  
                cart: []
            }
    }  
    componentDidMount(){
        console.log("I am here")
        const data = {
            email : cookie.load('email')
        }
      
        // axios.defaults.withCredentials = true;
        // axios.post('http://'+hostAddress+':3001/pastOrder/pastOrder',data,config)
        // .then((response) => {
            this.props.pastOrder(data);

        if(this.props.order!=null){
        let mapping=this.props.order.map(val=>{
            for(var i=0;i<val.orderDetails.length;i++){
            var obj1={
                "ID": val._id,
                "restaurant":val.rname,
                "item":val.orderDetails[i].itemname,
                "price":val.orderDetails[i].price,
                "status":val.status,
                "quantity": val.orderDetails[i].qty
        }
        if(orderList.has(val._id)){
            var temp=orderList.get(val._id);
            temp.push(obj1);
            orderList.set(val._id,temp);
        }else{
            orderList.set(val._id,[obj1]);
        }
    }
        })

        console.log(orderList)
        this.setState({
        })
    }
  //  });
    }


    render(){
    
    let redirectVar = null;
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/login"/>
    }
    if(cookie.load('cookie')=="restaurant"){
        redirectVar = <Redirect to= "/login"/>
    }
    let display=[];
    let addData=[];
       let details = orderList.forEach ( (v,k,order) => {
           console.log(order);
           console.log(" Yahahhahahahs")
           console.log(k)
           console.log(v)
           let det=v.forEach(det=>{
            total[c]+=det.price
            console.log(det);
            addData.push(
                <tr class="card">
                <td>{det["item"]}</td>
                <td></td>
                <td>{det.quantity}</td>
                <td>${det.price}</td>
                </tr>
            )
            })

display.push(
<div class="card" style={{width:" 40rem", border:"2px solid grey", margin:"5px", padding:"8px"}}>
  <div class="card-body">
    <h4 class="card-title"><b>Restaurant: {v[0].restaurant}</b></h4>
    <h5 class="card-title">Status : {v[0].status}</h5>
    <table class="table">
    <tr style={{backgroundColor:"red", color: "white", marginTop: "10px"}}>
    <td>Item Name</td>
    <td></td>
    <td>Item Quantity</td>
    <td>Item Price</td>
    </tr>
    <tbody>
          {det}
          {addData}               
    </tbody>
    </table>
  
    <div>
    <hr></hr>
    <pre>
    <b> Total Amount : $ {total[c]} </b>
    </pre>
    <hr></hr>
    </div>  
  </div>
</div>
)
total[++c]=0;  
addData=[];           

       }
    )        
        return(
            <div>
                {redirectVar}
                
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                        <h3>Past Orders</h3>
                        <hr></hr>
                        
                      {details}
                      {display}
                </div> 
               
            </div> 
        )
    }
}

//export default PastOrders;

function mapDispatchToProps(dispatch) {
    return {
        pastOrder: user => dispatch(pastOrder(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      order: store.pastOrder
    };
  }
 
  const PastOrdersC = connect(mapStateToProps, mapDispatchToProps)(PastOrders);
  export default PastOrdersC;