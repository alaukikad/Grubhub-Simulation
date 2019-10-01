import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


let ItemID=null;
let getDetail=null;
let delFlag=null;

class MenuCard extends Component {
    constructor(props){
            super(props);
            this.state = {  
                menu:[],
                section:[],
                options:[]
            } 
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
    });
    }
   
    editItem=(value)=>{
        console.log('edit item');
        ItemID=value;
        this.setState({
        })
    }

    deleteItem=(value)=>{
        const data = {
            id : value
        }
     
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/deleteitem',data)
        .then((response) => {
            alert(response.data);
        //update the state with the response data
        this.setState({       
        });
    });



        delFlag=true;
    }

    render(){
        
        let itemdetails = this.state.menu.map(item =>  {
            return(
                <tr>
                    <td><img src={item.image} style={{height: "60px",width:"90px"}}></img></td>
                    <td>{item.itemname}</td>
                    <td>{item.description}</td>
                    <td>${item.price}</td>
                    <td><a class="glyphicon glyphicon-plus" onClick={this.editItem.bind(this,item.mid)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a></td>
                    <td><input type="number" style={{width:"50px"}}></input></td>
                    <td><a class="glyphicon glyphicon-minus" onClick={this.deleteItem.bind(this,item.mid)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a></td>
                </tr> 
            )
        })
   
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
       
        return(
            <div style={{margin:"5%"}}>
                {redirectVar}
                
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
                    <a class="btn btn-primary2">Check Out</a>
                   </div>
                </div>  
            </div> 
        )}
}
//export Home Component
export default MenuCard;


