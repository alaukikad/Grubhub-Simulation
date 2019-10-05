import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


let orderList=new Map();
let total=[];
let c=-1;

class CancelledOrder extends Component {
    constructor(props){
            super(props);
    }  
   
    componentDidMount(){
        console.log("I am here")
        const data = {
            email : cookie.load('email')
        }
      
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/cancelledOrder',data)
        .then((response) => {
        let mapping=response.data.map(val=>{
            var obj1={
            "ID": val.oid,
            "customer":val.name,
            "item":val.itemname,
            "price":val.price,
            "status":val.status,
            "quantity": val.qty
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


    render(){
    
    let redirectVar = null;
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/login"/>
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
              <div><h4>Customer : {v[0].customer}</h4></div>
              <div> <b>Status :  {v[0].status}</b></div>
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
    
    <tr>
    <td>{det["item"]}</td>
     <td>................... </td>
    <td>{det.quantity}</td>
    <td>.................................. </td> 
    <td>${det.price}</td>
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
                        <h3>Cancelled Orders</h3>
                        
                      {details}
                      {display}
                </div> 
               
            </div> 
        )
    }
}

export default CancelledOrder;