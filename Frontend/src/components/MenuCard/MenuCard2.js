import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


let ItemID=null;
let getDetail=null;
let goToCart=false;
var quantityMap = new Map();
let quant=[];

class MenuCard extends Component {
    constructor(props){
            super(props);
            this.state = {  
                menu:[],
                section:[],
                options:[],
               
            } 

        this.checkOut = this.checkOut.bind(this);    
        this.incrementItem = this.incrementItem.bind(this);
        this.decrementItem = this.decrementItem.bind(this);
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
    }
   
    incrementItem=(e)=>{

        // var qty=quant[mid]+1
        // quant[mid]=qty;
        // console.log(quant);
    // var qt=quantityMap.get(mid);
    // quantityMap.set(mid,(qt+1));
    // console.log(quantityMap.get(mid))
     }

    setQuantity=(e)=>{
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name)
    quant[e.target.name]=e.target.value;
    console.log(quant);
    // quantityMap.set([e.target.name],e.target.value)
    // console.log(quantityMap)
    // console.log(quantityMap.get(e.target.name))
    }

     decrementItem=(mid)=>{
        var qty=quant[mid]-1
        quant[mid]=qty;
        console.log(quant);
    // var qt=quantityMap.get(i.mid);
    // console.log(quantityMap.get(i.mid))
    // quantityMap.set(i.mid,(qt-1));
    // console.log(quantityMap.get(i.mid))
     }

checkOut=(e)=>{
    console.log("Inside Checout1")
    const data = {
        rid : this.props.restID,
        qty : quant,
        uid : cookie.load('email')
    }
    
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/checkOut',data)
    .then((response) => {
    //update the state with the response data
    alert(response.data)
goToCart=true;
    this.setState({   
    });
    console.log("Inside Checout2")
});
}


    render(){
        
        let itemdetails = this.state.menu.map(item =>  {
            return(
                <tr>
                    <td><img src={item.image} style={{height: "60px",width:"90px"}}></img></td>
                    <td>{item.itemname}</td>
                    <td>{item.description}</td>
                    <td>${item.price}</td>
                    <td><a class="glyphicon glyphicon-plus" onClick={this.incrementItem.bind(item.mid,this)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a></td>
                    <td><input type="text" name={item.mid} pattern="[0-9]*" onChange={this.setQuantity.bind(this)} style={{width:"50px"}}></input></td>
                    <td><a class="glyphicon glyphicon-minus" onClick={this.decrementItem.bind(item.mid,this)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a></td>
                </tr> 
            )
        })
   
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
       
let goForward=null;
      if(goToCart){
         redirectVar = <Redirect to= "/cart"/>
        }

        return(
            <div style={{margin:"5%"}}>
                {redirectVar}
                {goForward}
                <div style={{backgroundColor:"white",marginLeft:"2%",opacity:"80%",overflowY:"auto"}}>
                <div>
                   
                   <h2 style={{color:"red"}}>Menu</h2>
                   <hr>
                
                   </hr>
                   <h4>Section Name</h4>
                <table class="table">
                        
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            
                            {itemdetails}
                           
                        </tbody>
                    </table>
                    <a class="btn btn-primary2" onClick={this.checkOut.bind(this)}>Check Out</a>
                   </div>
                </div>  
            </div> 
        )}
}
//export Home Component
export default MenuCard;


