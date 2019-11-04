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


total[++c]=0
 display.push(<div>
               <br></br>
              <div><h4>Restaurant : {v[0].restaurant}</h4></div>
              <div> <b>Status :  {v[0].status}</b> 
              <button class="btn btn-primary7" name={v[0].rid} style={{float:"right"}} onClick={this.showMsg}>Message</button>
              <div style={{padding: "10px", margin :"5px"}}>
              {msgDisplay}
              </div>
           
              </div>     
              <hr></hr>
              <div>
                  <table class="table">
                      <thead style={{backgroundColor:"red", height :"20px", color: "white", margin: "10px"}}>
                          <th>Item Name</th>
                          <th>Item Quantity</th>
                          <th>Item Price</th>
                      </thead>
                      <tbody>
                         
                      </tbody>
                      </table>
              </div>
          </div>) 

                 
    v.forEach(det=>{
    total[c]+=det.price
    console.log(det);
    display.push(
    
        <tr>
        <td><div style={{marginRight:"40px", display:"flex"}}>{det["item"]}</div></td>
        <td> </td>
        <td><div style={{marginRight:"50px", display:"flex",marginLeft:"40px"}}>{det.quantity}</div></td>
        <td> </td> 
        <td><div style={{marginLeft:"80px", display:"flex"}}>${det.price}</div></td>
        </tr>
   
    )
    })

        display.push(<div>
            <hr></hr>
            <pre>
            <b> Total Amount : $ {total[c]} </b>
            </pre>
            <hr></hr>
        </div>  
        )
       }
    )        
        return(
            <div>
                {redirectVar}
                
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                        <h3>Upcoming Orders</h3>
                        
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