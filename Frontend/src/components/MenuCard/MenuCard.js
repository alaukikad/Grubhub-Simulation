import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

let goToCart=false;
let quant=null;
let secList=[];

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
        axios.post('http://localhost:3001/getMenu',data)
        .then((response) => {
        //update the state with the response data
        this.setState({
            menu : this.state.menu.concat(response.data) 
        });
        console.log(this.state.menu)
    });
    axios.post('http://localhost:3001/getSection',data)
        .then((response) => {
        //update the state with the response data
        console.log("here in Sections")
        console.log(response.data)
        secList=response.data;
        console.log(secList)
    });
    }
   
    setQuantity=(e)=>{
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name)
    quant[e.target.name]=e.target.value;
    console.log(quant); 
    }

checkOut=(e)=>{
    console.log("Inside Checkout1")
    const data = {
        rid : this.props.restID,
        qty : quant,
        uid : cookie.load('email')
    }
    console.log(quant)
    if(quant==null){
    alert("No Food Added to Cart!")
    }else{
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/checkOut',data)
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
        let display=[];
        let sectionDetails= secList.map(sec => {
            console.log(sec)
            let secItems=this.state.menu.filter(item=> item.name == sec.value)
            let itemdetails = secItems.map(item =>  {
                display.push(
                    <tr>
                        <td><img src={item.image} style={{height: "60px",width:"90px", margin : "10px"}}></img></td>
                        <td><div style={{margin : "10px"}}>{item.itemname}</div></td>
                        <td><div style={{margin : "10px"}}>{item.description}</div></td>
                        <td><div style={{margin : "10px"}}>${item.price}</div></td>
                        <td><input type="text" name={item.mid} pattern="[0-9]*" onChange={this.setQuantity.bind(this)} style={{width:"50px"}}></input></td>
                    </tr> 
                )
            })
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
                   <h2 style={{color:"red"}}>Menu</h2>
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


