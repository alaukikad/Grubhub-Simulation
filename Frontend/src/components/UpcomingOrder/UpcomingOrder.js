import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import hostAddress from '../constants';
import {upcomingOrder} from '../../js/actions/orders';
import { connect } from "react-redux";
// import Popup from "reactjs-popup";
// import Content from "./Content.js";

let orderList;
let msgSend=null;
let total=[];
let c=-1;
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }
  
class UpcomingOrder extends Component {
    constructor(props){
            super(props);
            this.state={
                message : ""
            }
            orderList=new Map();
            this.showMsg= this.showMsg.bind(this);
            this.onMessageChangeHandler= this.onMessageChangeHandler.bind(this);
            this.sendMessage= this.sendMessage.bind(this);
            this.cancelMessage= this.cancelMessage.bind(this);
    }  
   
    sendMessage=(e)=>{
        if(this.state.message!=""){
             const data={
                 receiver : msgSend,
                 sender : cookie.load('email'),
                 body:this.state.message
             }
            axios.defaults.withCredentials = true;
            axios.post('http://'+hostAddress+':3001/sendMessage/sendMessage',data,config)
            .then(response => {    
            console.log(response)
            alert(response.data);
            msgSend=null;
        })    
    }else{
        alert(" Please enter Message!");
    }
    }

    cancelMessage=(e)=>{
        msgSend=null;
        this.setState({
        })
    }

    showMsg=(e)=>{
        msgSend= e.target.name;
        this.setState({
        })
    }
    
    onMessageChangeHandler = (e) => {
        this.setState({
            message : e.target.value
        })
    }


    componentDidMount(){
        console.log("I am here")
        const data = {
            email : cookie.load('email')
        }
      
        this.props.upcomingOrder(data);
        // axios.defaults.withCredentials = true;
        // axios.post('http://'+hostAddress+':3001/upcomingOrder/upcomingOrder',data, config)
        // .then((response) => {
        
        
        var l=0;
        if(this.props.order!=null){
        let mapping=this.props.order.map(val=>{
            console.log(val)
           for(var i=0;i<val.orderDetails.length;i++){
            var obj1={
            "ID": val._id,
            "restaurant":val.rname,
            "rid":val.rid,
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
   // });
    }
}



    render(){
    
    let redirectVar = null;
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/login"/>
    }
    if(cookie.load('cookie')=="restaurant"){
        redirectVar = <Redirect to= "/login"/>
    }

    let msgDisplay=null;
    if(msgSend!=null){
      msgDisplay=<div>
          <form>
              <input type="text" onChange={this.onMessageChangeHandler} style={{ height :"40px"}} placeholder="Type Your Text Here"></input>
              <button class="btn btn-primary6" onClick={this.sendMessage} style={{ margin :"5px"}}>Send</button>
              <button class="btn btn-primary5" onClick={this.cancelMessage} style={{margin :"5px"}}>Cancel</button>
          </form>
      </div>
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
        <h4 class="card-title"><b>Restaurant : {v[0].restaurant}</b></h4>
        <div>
        <h5 class="card-title">Status : {v[0].status}</h5>
        <button class="btn btn-primary7" name={v[0].rid}  onClick={this.showMsg}>Message</button>
              <div style={{padding: "10px", margin :"5px"}}>
              {msgDisplay}
              </div>
              </div>
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
                        <h3>Upcoming Orders</h3>
                        <hr></hr>
                      {details}
                      {display}
                </div> 
               
            </div> 
        )
    }
}

//export default UpcomingOrder;

function mapDispatchToProps(dispatch) {
    return {
        upcomingOrder: user => dispatch(upcomingOrder(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      order: store.upcomingOrder
    };
  }
 
  const UpcomingOrderC = connect(mapStateToProps, mapDispatchToProps)(UpcomingOrder);
  export default UpcomingOrderC;