import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import AddItem from '../AddItem/AddItem';
import AddSection from '../AddSection/AddSection';
import EditItem from '../EditItem/EditItem';

let ItemID=null;
let getDetail=null;
let delFlag=null;

class Rmenu extends Component {
    constructor(props){
            super(props);
            this.state = {  
                menu:[],
                section:[],
                options:[],
                open : false
            } 
    }  
   
    componentDidMount(){
        const data = {
            email : cookie.load('email')
        }

        console.log(cookie.load('email'));
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/getMenu',data)
        .then((response) => {
        //update the state with the response data
        this.setState({
            menu : this.state.menu.concat(response.data) 
        });
    });
       axios.post('http://localhost:3001/getSection',data)
        .then((response) => {
        //update the state with the response data
        this.setState({
            options : response.data
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
        let display=[]

        let itemdetails = this.state.menu.map(item =>  {
            
            return(
                <tr>
                    <td><img src={item.image} style={{height: "60px",width:"90px"}}></img></td>
                    <td>{item.itemname}</td>
                    <td>{item.description}</td>
                    <td>${item.price}</td>
                    <td><a class="glyphicon glyphicon-pencil" onClick={this.editItem.bind(this,item.mid)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a></td>
                    <td><a class="glyphicon glyphicon-trash" onClick={this.deleteItem.bind(this,item.mid)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a></td>
                </tr> 
            )
        })

        display.push(
            <div>
                   
                   <h2>Menu</h2>
                   <hr></hr>
                   <div></div>
                   <h4>Section Name</h4>
                    <table class="table">
                        
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {itemdetails}    
                        </tbody>
                    </table>
                   
                   </div>
        )
   
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        if(cookie.load('cookie')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        if(delFlag){
            redirectVar = window.location.reload();
            delFlag=false;
        }
        if(ItemID!=null)
        {
            getDetail=<EditItem key='itemdets' ItemID={ItemID}></EditItem>;
            ItemID=null;
        }
        else{
            getDetail=<AddItem/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container split left div-left2" style={{backgroundColor:"white", width:"25%"}}>
                <AddSection/>  
                {getDetail}
    
                </div>
                <div class="container split right div-right2" style={{backgroundColor:"white", width:"62%",opacity:"80%"}}>
                {display}
                </div>  
            </div> 
        )}
}
//export Home Component
export default Rmenu;


