import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import hostAddress from '../constants';
import {cancelledOrder} from '../../js/actions/orders';
import { connect } from "react-redux";
import Pagination from '../Pagination/Pagination';

let orderList;
let total=[];
let c=-1;
let arr=[];
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

class CancelledOrder extends Component {
    constructor(props){
            super(props);
            orderList=new Map();
            this.state={
                currentPage: 1,
                totalPages: 0,
                currentOrders : []
            }
    }  
   
    componentDidMount(){
        console.log("I am here")
        const data = {
            email : cookie.load('email')
        }

        this.props.cancelledOrder(data);
        // axios.defaults.withCredentials = true;
        // axios.post('http://'+hostAddress+':3001/cancelledOrder/cancelledOrder',data,config)
        // .then((response) => {
        if(this.props.order!=null){
            console.log("OPOPOPOP")
        let mapping=this.props.order.map(val=>{
        for(var i=0;i<val.orderDetails.length;i++){
            var obj1={
            "ID": val._id,
            "customer":val.uname,
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
            arr.push(val._id);
            orderList.set(val._id,[obj1]);
        }
    }
        })
        let currArr=arr.slice(0, 2);
        let currentOrders2=new Map();
        currArr.forEach(i=>{
            currentOrders2.set(i,orderList.get(i))
        })
        console.log("Hellooooo",currentOrders2)
         this.setState({
             currentPage :1,
             totalPages : Object.keys(orderList).length,
             currentOrders:currentOrders2
         })

      }
  //  });
    }


    onPageChanged = data => {
        //const  allOrders  = orderList;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        let currArr=arr.slice(offset, offset + pageLimit);
        let currentOrders2=new Map();
        currArr.forEach(i=>{
            currentOrders2.set(i,orderList.get(i))
        })
        //const currentOrders2 = orderList.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage: currentPage,
            totalPages: Object.keys(orderList).length,
            currentOrders : currentOrders2  });
      }

    render(){
        const totalOrders = Object.keys(orderList).length;  
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(cookie.load('cookie')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        let display=[];
        let addData=[];
        let details = this.state.currentOrders.forEach ( (v,k,order) => {
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
    <h4 class="card-title"><b>Customer : {v[0].customer}</b></h4>
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
    
        
            return (
             <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                        <h3>Cancelled Orders</h3>
                        <hr></hr>
                        {details}
                 {display}
                 <div className="d-flex flex-row py-4 align-items-center">
                      <Pagination totalRecords={totalOrders} pageLimit={2} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                    </div>
                 </div> 
 
            ) 
}
}
// export default CancelledOrder;


function mapDispatchToProps(dispatch) {
    return {
        cancelledOrder: user => dispatch(cancelledOrder(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      order: store.cancelledOrder
    };
  }
 
  const CancelledOrderC = connect(mapStateToProps, mapDispatchToProps)(CancelledOrder);
  export default CancelledOrderC;