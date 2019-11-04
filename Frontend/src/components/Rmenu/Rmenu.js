import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import AddItem from '../AddItem/AddItem';
import AddSection from '../AddSection/AddSection';
import EditItem from '../EditItem/EditItem';
import EditSection from '../EditSection/EditSection';
import hostAddress from '../constants';

import {getMenu,deleteItem,deleteSection} from '../../js/actions/menu';
import { connect } from "react-redux";


let ItemID=null;
let getDetail=null;
let delFlag=null;
let secList;
let sectionID=null;
let prevSecName="";
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

class Rmenu extends Component {
    constructor(props){
            super(props);
            this.state = {  
                menu:[],
                section:[],
                options:[]
            }
            secList=[];
            this.editSection = this.editSection.bind(this);
            this.deleteSection = this.deleteSection.bind(this);
    }  
   
    componentDidMount(){
        const data = {
            email : cookie.load('email')
        }
        this.props.getMenu(data);
    //     console.log(cookie.load('email'));
    //     axios.defaults.withCredentials = true;
    //     axios.post('http://'+hostAddress+':3001/getMenu/getMenu',data,config)
    //     .then((response) => {
    //     //update the state with the response data
    //     this.setState({
    //         menu : this.state.menu.concat(response.data) 
    //     });
    // });
       axios.post('http://'+hostAddress+':3001/getSection/getSection',data,config)
        .then((response) => {
        //update the state with the response data
        console.log("here")
        console.log(response.data)
        let o=[]
        let temp=response.data.map( sec=>{
           o.push(sec.value);
        })
        secList=response.data;

        this.setState({
            options : o
        });
    });
    }
   
    editItem=(value)=>{
        console.log('edit item');
        ItemID=value;
        this.setState({
        })
    }

    editSection=(value)=>{
        console.log('edit section');
        console.log(value)
        sectionID=value;
        this.setState({
        })
    }

    deleteSection=(value)=>{
        const data = {
            id : value,
            rid: cookie.load('email'),
            p : prevSecName
        }
        this.props.deleteSection(data);
        alert("Section Deleted!!");
        delFlag=true;
        // axios.defaults.withCredentials = true;
        // axios.post('http://'+hostAddress+':3001/deleteSection/deleteSection',data,config)
        // .then((response) => {
        //     alert(response.data);
        //update the state with the response data
        this.setState({       
        });
   // });
        
    }


    deleteItem=(value)=>{
        const data = {
            id : value
        }
     
    //     axios.defaults.withCredentials = true;
    //     axios.post('http://'+hostAddress+':3001/deleteitem/deleteitem',data,config)
    //     .then((response) => {
    //         alert(response.data);
    //     //update the state with the response data
    //     this.setState({       
    //     });
    // });
     this.props.deleteItem(data);
     alert("Item Deleted!!");
     delFlag=true;
       this.setState({       
       });
       
    }

    render(){
        let display=[]
        
        let sectionDetails= secList.forEach(sec => {
         //  setTimeout(() => {
               
           
            let secItems=this.props.menu.filter(item=> item.sid == sec.value)
            display.push(
                <div>
                <div style={{display:"Flex"}}>
                <h4>{sec.value}</h4>
                <a class="glyphicon glyphicon-pencil" onClick={this.editSection.bind(this,sec.key)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a>
                <a class="glyphicon glyphicon-trash" onClick={this.deleteSection.bind(this,sec.key)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a>
                </div>  
                <table class="table">
                    
                    <tbody>
                        {/*Display the Tbale row based on data recieved*/}
                        {itemdetails}    
                    </tbody>
                    </table>
                </div>)
            let itemdetails = secItems.map(item =>  {
                console.log(item.image)
                display.push(
                    <tr>
                    <td> <img
                    src={"http://"+hostAddress+":3001/images/all/"+item.image}
                    id="itemimg"
                    style={{height: "60px",width:"90px", margin : "10px"}}
                    alt="Item Display"
                    /></td>
                        <td><div style={{margin : "10px"}}>{item.itemname}</div></td>
                        <td><div style={{margin : "10px"}}>{item.desc}</div></td>
                        <td><div style={{margin : "10px"}}>${item.price}</div></td>
                        <td><a class="glyphicon glyphicon-pencil" onClick={this.editItem.bind(this,item._id)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a></td>
                        <td><a class="glyphicon glyphicon-trash" onClick={this.deleteItem.bind(this,item._id)} style={{padding:"5px", margin:"5px", borderRadius:"12px"}}></a></td>
                       
                    </tr> 
                )
            })   
        //}, 200);  
        })
   

        display.push(
            <div>
                {sectionDetails}
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
        let getSection=null

        if(sectionID!=null)
        {
            getDetail=<EditSection key='itemdets' sectionID={sectionID}></EditSection>;
            sectionID=null;
        }
        else{
            getSection=<AddSection/> 
        }
        return(
            <div>
                {redirectVar}
                <div class="container split left div-left2" style={{backgroundColor:"white", width:"25%"}}>
                {getSection}
                {getDetail}
    
                </div>
                <div class="container split right div-right2" style={{backgroundColor:"white", width:"62%",opacity:"80%"}}>
               <h2 style={{color:"red"}}>Menu</h2>
               <hr></hr>
                {display}
                </div>  
            </div> 
        )}
}
//export Home Component
//export default Rmenu;


function mapDispatchToProps(dispatch) {
    return {
        getMenu: user => dispatch(getMenu(user)),
        deleteSection : user => dispatch(deleteSection(user)),
        deleteItem : user => dispatch(deleteItem(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      menu: store.menu
    };
  }
 
  const RmenuC = connect(mapStateToProps, mapDispatchToProps)(Rmenu);
  export default RmenuC;



