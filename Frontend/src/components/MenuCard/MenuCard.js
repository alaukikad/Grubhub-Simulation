import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import hostAddress from '../constants';

let goToCart=false;
let quant=new Map();

let secList=[];
let display;
let resp1=[];
let itemdetails = null;

class MenuCard extends Component {
    constructor(props){
            super(props);
            this.state = {  
                menu:[]
            } 
       
        this.checkOut = this.checkOut.bind(this);    
        this.setQuantity = this.setQuantity.bind(this);
    }  
   
    componentDidMount(){
        const data = {
            email : this.props.restID
        }
    
        axios.defaults.withCredentials = true;
        axios.post('http://'+hostAddress+':3001/getMenu/getMenu',data)
        .then((response) => {
        //update the state with the response data
        console.log("In get menu constructor")
        resp1=response.data
        console.log(resp1)
        })
        
        axios.post('http://'+hostAddress+':3001/getSection/getSection',data)
        .then((response) => {
        //update the state with the response data
        console.log("here in Sections")
        console.log(response.data)
        secList=response.data;
        console.log(secList)
        console.log(resp1)
        this.setState({
            menu : this.state.menu.concat(resp1) 
        });
        })
    console.log("i am ahiyaaa")
    console.log(resp1);
    
    console.log("In menu")
    console.log(this.state.menu)
    }
   
    setQuantity=(name,price,e)=>{
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name)
    quant.set(e.target.name,{
        itemname:e.target.name,
        qty:e.target.value,
        price:name
    });
    //quant[e.target.name]=e.target.value;
    console.log(quant); 
    }

checkOut=(e)=>{
    console.log("Inside Checkout1")
    let t=[];
    let c=-1;
    let a=quant.forEach((v,k,i)=>{
    t[++c]=v;
    })

    const data = {
        rid : this.props.restID,
        qty : t,
        uid : cookie.load('email'),
        rname : this.props.restName
    }
    console.log(t)
    if(quant==null){
    alert("No Food Added to Cart!")
    }else{
    axios.defaults.withCredentials = true;
    axios.post('http://'+hostAddress+':3001/checkOut/checkOut',data)
    .then((response) => {
    //update the state with the response data
    alert(response.data)
    goToCart=true;
    this.setState({   
    });
    console.log("Inside Checkout2")
});
    }
}

    render(){
        display=[]
        let sectionDetails= secList.map(sec => {
            console.log("in section Display")
            console.log(sec)
            let secItems=resp1.filter(item=> item.sid == sec.value)
            display.push(
                <div>
                <div style={{display:"Flex"}}>
                <h4>{sec.value}</h4>
                </div>  
                <table class="table">
                    <tbody>
                        {/*Display the Tbale row based on data recieved*/}
                        {itemdetails}   
                    </tbody>
                    </table>
                </div>)
                 itemdetails =secItems.map(item =>  {
                    console.log("Hello There")
                    console.log(item)
                    display.push(
                        <tr>
                            <td> 
                            <img
                            src={"http://"+hostAddress+":3001/images/all/"+item.image+""}
                            id="itemimg"
                            style={{height: "60px",width:"90px", margin : "10px"}}
                            alt="Item Display"/>
                            </td>
                            <td><div style={{margin : "10px"}}>{item.itemname}</div></td>
                            <td><div style={{margin : "10px"}}>{item.desc}</div></td>
                            <td><div style={{margin : "10px"}}>${item.price}</div></td>
                            <td><input type="text" name={item.itemname} pattern="[0-9]*" onChange={this.setQuantity.bind(item.itemname,item.price,this)} style={{width:"50px"}}></input></td>
                        </tr> 
                    )
                })
        })
        
    
        display.push(
            <div>
                {sectionDetails}
             </div>
                   
        )
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(cookie.load('cookie')=="restaurant"){
            redirectVar = <Redirect to= "/login"/>
        }
      let goForward=null;
      if(goToCart){
          goToCart=false;
         redirectVar = <Redirect to= "/cart"/>
        }

        return(
            <div style={{margin:"5%"}}>
                {redirectVar}
                {goForward}
                <div style={{backgroundColor:"white",marginLeft:"2%",opacity:"80%",overflowY:"auto"}}>
                <div>
                   <h2 style={{color:"red"}}>{this.props.restName}</h2>
                   <hr></hr>
                   {display}
                    <a class="btn btn-primary2" onClick={this.checkOut.bind(this)}>Check Out</a>
                   </div>
                </div>  
            </div> 
        )}
}
//export Home Component
export default MenuCard;


