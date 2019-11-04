import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
// import hostAddress from '../constants';
// import axios from 'axios';
import {delieveredOrder} from '../../js/actions/orders';
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";

let orderList;
let total=[];
let c=-1;
let arr = [];
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

class DeliveredOrder extends Component {
    constructor(props){
            super(props);
            orderList=new Map();
            this.state = {
                //for pagination
                paginated_orders: null,
                results_per_page: 2,
                num_pages: 0,
                status: [],
                inc: []
              };
              this.handlePageClick = this.handlePageClick.bind(this);
    }  
   
    componentDidMount(){
        console.log("I am here")
        const data = {
            email : cookie.load('email')
        }
        
        // axios.defaults.withCredentials = true;
        // axios.post('http://'+hostAddress+':3001/deliveredOrder/deliveredOrder',data,config)
        // .then((response) => {
        this.props.delieveredOrder(data);
       
        if(this.props.order!=null){
        let mapping= this.props.order.map(val=>{
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

       let currArr = arr.slice(0, this.state.results_per_page);
       let currentOrders2 = new Map();
       currArr.forEach(i => {
         currentOrders2.set(i, orderList.get(i));
       });
       console.log("Hellooooo", currentOrders2);
       const pages = Math.ceil(
         arr.length  / this.state.results_per_page
       );
       this.setState({
         num_pages: pages,
         paginated_orders: currentOrders2
       });
    }
   // });
    }
    handlePageClick(data) {
        console.log(data.selected);
        let page_number = data.selected;
        let offset = Math.ceil(page_number * this.state.results_per_page);
        let currArr = arr.slice(offset, offset + this.state.results_per_page);
        let currentOrders2 = new Map();
        currArr.forEach(i => {
          currentOrders2.set(i, orderList.get(i));
        });
        this.setState({
          paginated_orders: currentOrders2
        });
      }

    render(){
    
    let redirectVar = null;
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/rlogin"/>
    }
    if(cookie.load('cookie')=="customer"){
        redirectVar = <Redirect to= "/rlogin"/>
    }
    let display=[];
    let addData=[];
    let details;
    if(this.state.paginated_orders!=null){
        details = this.state.paginated_orders.forEach ( (v,k,order) => {
           console.log(order);
           console.log(" Yahahhahahaccchs")
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
    )   }
    else{
        details=<div style={{margin:"35px"}}> Nothing to Show!:(</div>
    }     
        return(
            <div>
                {redirectVar}
                
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                        <h3>Delivered Orders</h3>
                        <hr></hr>
                      {details}
                      {display}
                      <div className="row" style={{margin:"30px"}}>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.num_pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
                </div> 
               
            </div> 
        )
    }
}

//export default DeliveredOrder;


function mapDispatchToProps(dispatch) {
    return {
        delieveredOrder: user => dispatch(delieveredOrder(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      order: store.deliveredOrder
    };
  }
 
  const DeliveredOrderC = connect(mapStateToProps, mapDispatchToProps)(DeliveredOrder);
  export default DeliveredOrderC;