import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import MenuCard from '../MenuCard/MenuCard';
import hostAddress from '../constants';
import { connect } from "react-redux";

let restID=null;
let updateFlag=false;
let restName=null;


class ViewFood extends Component {
    constructor(props){
            super(props); 
            this.viewRestaurant = this.viewRestaurant.bind(this);
    }  
   
    componentDidMount(){

    }
   
    viewRestaurant=(value,name)=>{
       console.log("I am here");
       restID=value;
       restName=name;
       updateFlag=true;
       this.setState({

       })
      }


    render(){
        
        let restaurantdetails = this.props.search.map(rest =>  {
            return(
                <tr>
                <td>
                <img
                        src={"http://"+hostAddress+":3001/images/all/"+rest.rimage+""}
                        id="restimg"
                        style={{marginLeft:"20px",height: "80px",width:"120px"}}
                        alt="Restaurant Display"/>
                </td>
                <td><b><h4>{rest.name}</h4></b></td>
                <td><b><h4>{rest.cuisine}</h4></b></td>
                <td><b><h4>{rest.address}</h4></b></td>
                <td style={{width:"400px"}}><a class="btn btn-primary2" onClick={this.viewRestaurant.bind(this,rest.email,rest.name)}>View</a></td>
            </tr> 

            )
        })
   
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(cookie.load('cookie')=="restaurant"){
            redirectVar = <Redirect to= "/login"/>
        }
        let getMenu=null;
        if(restID!=null){
            getMenu=<MenuCard key='menucard' restID={restID} restName={restName}></MenuCard>;
            restID=null;
        } 
        else{
            
           getMenu=
                <div style={{overflowY:"auto"}}>
                 <br></br>
                   <h2 style={{margin:"8px", textAlign :"center", color:"Red"}}> Check Out the Restaurants!</h2>
                   <hr>
                   </hr>
                        <table class="table">                        
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {restaurantdetails}
                        </tbody>
                    </table>
                 </div>
               
        }
        
        return(
            <div style={{overflowY:"auto"}}>
                {redirectVar}
                <div style={{backgroundColor:"white", borderRadius:"12px",width:"100%",opacity:"80%",overflowY:"auto"}}>
                {getMenu}
                </div>  
            </div> 
        )}
}
//export Home Component
//export default ViewFood;

function mapStateToProps(store) {
    return {
      search: store.searchedRestaurant
    };
  }
 
  const ViewFoodC = connect(mapStateToProps, null)(ViewFood);
  export default ViewFoodC;


