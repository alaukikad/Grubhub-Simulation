import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import MenuCard from '../MenuCard/MenuCard';

let restID=null;
let updateFlag=false;

class ViewFood extends Component {
    constructor(props){
            super(props); 
            this.viewRestaurant = this.viewRestaurant.bind(this);
    }  
   
    componentDidMount(){

    }
   
    viewRestaurant=(value)=>{
       console.log("I am here");
       restID=value;
       updateFlag=true;
       this.setState({

       })
      }


    render(){
        
        let restaurantdetails = this.props.restaurants.map(rest =>  {
            return(
                <tr>
                <td><img src="" style={{height: "80px",width:"100px", padding:"10px", marginBottom:"10px"}}></img></td>
                <td><b><h4>{rest.name}</h4></b></td>
                <td><b><h4>{rest.cuisine}</h4></b></td>
                <td><b><h4>{rest.address}</h4></b></td>
                <td style={{width:"400px"}}><a class="btn btn-primary2" onClick={this.viewRestaurant.bind(this,rest.email)}>View</a></td>
            </tr> 

            )
        })
   
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        
        let getMenu=null;
        if(restID!=null){
            getMenu=<MenuCard key='menucard' restID={restID}></MenuCard>;
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
                <div style={{backgroundColor:"white", width:"100%",opacity:"80%",overflowY:"auto"}}>
                {getMenu}
                </div>  
            </div> 
        )}
}
//export Home Component
export default ViewFood;


