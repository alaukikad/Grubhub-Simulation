import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

let orderList;
let total=[];
let c=-1;
let editMode=false;
let statusMap;
let updateFlag=false;


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
    }  
   
    componentDidMount(){
        console.log("I am here")
        const data = {
            email : cookie.load('email')
        }
      
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/pendingOrder',data)
        .then((response) => {
        let mapping=response.data.map(val=>{
            var obj1={
            "ID": val.oid,
            "customer":val.name,
            "item":val.itemname,
            "price":val.price,
            "status":val.status,
            "quantity": val.qty,
            "address" : val.address
        }
        if(orderList.has(val.oid)){
            var temp=orderList.get(val.oid);
            temp.push(obj1);
            orderList.set(val.oid,temp);
        }else{
            orderList.set(val.oid,[obj1]);
        }
        })

        console.log(orderList)
        this.setState({
        })
    });
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
        console.log(statusMap.get(parseInt(e.target.name,10)))
        e.preventDefault();
        const data ={
            oid : e.target.name,
            status : statusMap.get(parseInt(e.target.name,10))
        }

         //set the with credentials to true
     axios.defaults.withCredentials = true;
     //make a post request with the user data
 
     axios.post('http://localhost:3001/updateOrderStatus',data)
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
              <div> <b>Status :{v[0].status}</b></div>
              <div> Address :{v[0].address}</div>
             <div style={{display:"flex", margin: "10px"}}>
                
                 <Dropdown options={this.state.options} name="status" onChange={this.statusChangeHandler.bind(this,v[0].ID)} placeholder="Update Status" value={v[0].status}/>
                 <button class="btn btn-primary4" onClick={this.updateStatus} name={v[0].ID} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}>Update</button>
            </div>
            
              <hr></hr>
              <div>
                  <table class="table">
                      <thead>
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

export default PendingOrder;