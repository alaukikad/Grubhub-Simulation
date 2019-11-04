import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import hostAddress from '../constants';
import {pendingOrder} from '../../js/actions/orders';
import { connect } from "react-redux";

let msgSend=null;
let orderList;
let total=[];
let c=-1;
let editMode=false;
let statusMap;
let updateFlag=false;
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }


class PendingOrder extends Component {
    constructor(props){
            super(props);
            orderList=new Map();  
            statusMap=new Map();
            this.state={
                options : ["Delivered","Cancelled","Ready", "Preparing"]
            }       
            this.statusChangeHandler= this.statusChangeHandler.bind(this);
            this.updateStatus= this.updateStatus.bind(this);
            this.showMsg= this.showMsg.bind(this);
            this.onMessageChangeHandler= this.onMessageChangeHandler.bind(this);
            this.sendMessage= this.sendMessage.bind(this);
            this.cancelMessage= this.cancelMessage.bind(this);
    }  
   
    componentDidMount(){
        console.log("I am here")
        const data = {
            email : cookie.load('email')
        }
        this.props.pendingOrder(data);
        // axios.defaults.withCredentials = true;
        // axios.post('http://'+hostAddress+':3001/pendingOrder/pendingOrder',data,config)
        // .then((response) => {
            if(this.props.order!=null){
        let mapping=this.props.order.map(val=>{
            for(var i=0;i<val.orderDetails.length;i++){
            var obj1={
                "ID": val._id,
                "customer":val.uname,
                "uid":val.uid,
                "address" : val.uaddress,
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
  //  });
    }
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
    statusChangeHandler = (value,e) => {
        //console.log(value.value);
        console.log("I am here in change")
        console.log(value)
        console.log(e)
        console.log(e.value)
        statusMap.set(value,e.value);
        console.log(statusMap)
       // price[value.name]  
    }

    updateStatus =(e)=>{
        console.log("in here")
        console.log(e.target.name)  
        console.log(statusMap)
       // console.log(statusMap.get(parseInt(e.target.name,10)))
        e.preventDefault();
        const data ={
            oid : e.target.name,
            status : statusMap.get(e.target.name)
        }

         //set the with credentials to true
     axios.defaults.withCredentials = true;
     //make a post request with the user data
 
     axios.post('http://'+hostAddress+':3001/updateOrderStatus/updateOrderStatus',data,config)
     .then(response => {
         alert(response.data);
         console.log("Status Code : ",response.status);
         updateFlag=true;
         this.setState({
         })
        
     })
       
    }

    render(){
        
    let redirectVar = null;
    
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/rlogin"/>
    }
    if(cookie.load('cookie')=="customer"){
        redirectVar = <Redirect to= "/rlogin"/>
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
    if(updateFlag){
        updateFlag=false;
        redirectVar =<Redirect to= "/rhome"/>
    }
    let display=[];
    let addData=[];
       let details = orderList.forEach ( (v,k,order) => {
           console.log(order);
           console.log(" Yahahhahahaccchs")
    console.log(k)
    console.log(v)

// let showStatus=null;
// if(!editMode){
//    showStatus=<div> <b>Status :{v[0].status}</b> <button onClick={this.getEdit} class="glyphicon glyphicon-pencil" style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></button></div>
// }else{
//    showStatus=<div><Dropdown options={this.state.options} name={v[0].ID}   name="status" onChange={this.statusChangeHandler(this)} placeholder="Status"/><button class="glyphicon glyphicon-floppy-disk" style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></button></div>
// }

total[++c]=0
 display.push(<div>
               <br></br>
              <div><h4>Customer : {v[0].customer}</h4></div>
              <div> <b>Status :{v[0].status}</b>
              <button class="btn btn-primary7" name={v[0].uid} style={{float:"right"}} onClick={this.showMsg}>Message</button>
              </div>
              <div style={{padding: "10px", margin :"5px"}}>
              {msgDisplay}
              </div>
              <div> Address :{v[0].address}</div>
             <div style={{display:"flex", margin: "10px"}}>
                
                 <Dropdown options={this.state.options} name="status" onChange={this.statusChangeHandler.bind(this,v[0].ID)} placeholder="Update Status" value={v[0].status}/>
                 <button class="btn btn-primary4" onClick={this.updateStatus} name={v[0].ID} style={{padding:"5px", margin:"5px", borderRadius:"8px"}}>Update</button>
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
    
    <table>
    <td><div style={{marginRight:"40px"}}>{det["item"]}</div></td>
     <td> </td>
    <td><div style={{marginRight:"50px",marginLeft:"40px"}}>{det.quantity}</div></td>
    <td> </td> 
    <td><div style={{marginLeft:"80px"}}>${det.price}</div></td>
    </table>
   
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
                        <h3>Pending Orders</h3>
                        
                      {details}
                      {display}
                </div> 
               
            </div> 
        )
    }
}

//export default PendingOrder;


function mapDispatchToProps(dispatch) {
    return {
        pendingOrder: user => dispatch(pendingOrder(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      order: store.pendingOrder
    };
  }
 
  const PendingOrderC = connect(mapStateToProps, mapDispatchToProps)(PendingOrder);
  export default PendingOrderC;