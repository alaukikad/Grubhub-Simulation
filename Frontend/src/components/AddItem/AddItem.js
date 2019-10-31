import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import hostAddress from '../constants';

let updateFlag=false;
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

//Define a Login Component
class AddItem extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            secList : [],
            itemname : "",
            description: "",
            price : "",
            image : "",
            section : "",
            options : [],
            address : "",
            restaurant : "",
            cuisine : "" ,
            rimage : ""
        }
        //Bind the handlers to this class
        
        this.sectionChangeHandler= this.sectionChangeHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
   componentWillMount(){
   const data={
       email: cookie.load('email')
   }
     //set the with credentials to true
     axios.defaults.withCredentials = true;

     const data2 = {
        email : cookie.load("email")
    }
    
    console.log(data);

   var t1,t2,t3,t4;
    //make a post request with the user data
           axios.post('http://'+hostAddress+':3001/rprofile/rprofile',data2,config)
            .then((response) => {
                t1= response.data.cuisine;
                t2 = response.data.address;
                t3=response.data.name;
                t4=response.data.rimage;
            })
axios.post('http://'+hostAddress+':3001/getSection/getSection',data,config)
.then((response) => {
//update the state with the response data
console.log("here")
console.log(response.data)
let o=[]
let temp=response.data.map( sec=>{
   o.push(sec.value);
})
this.setState({
        secList : response.data,
        options : o,
        restaurant : t3,
        cuisine : t1,
        address : t2,
        rimage : t4
});
})
    }


    //email change handler to update state variable with the text entered by the user
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    sectionChangeHandler = (value) => {
        console.log(value.value);
        this.setState({
            section : value.value
        })
        
    }


    //submit Register handler to send a request to the node backend
    submitForm= (e) => {
        var headers = new Headers();
        // var scid;
        // for(var i=0;i<this.state.secList.length;i++){
        //     if(this.state.section== this.state.secList[i].value){
        //      scid=this.state.secList[i].key;
        //     break;
        //     }
        // }
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : cookie.load('email'),
            itemname : this.state.itemname,
            description: this.state.description,
            price : this.state.price,
            //sid : scid
            sid: this.state.section,
            name : this.state.restaurant,
            cuisine : this.state.cuisine,
            address : this.state.address,
            rimage : this.state.rimage
        }

if(this.itemname.value=="" || this.description.value=="" ||this.section.value=="" ||this.price.value=="" ){
alert("Please fill all Fields!");
}else{
     //set the with credentials to true
     axios.defaults.withCredentials = true;
     //make a post request with the user data
 
     axios.post('http://'+hostAddress+':3001/additem/additem',data,config)
     .then(response => {
        alert(response.data)
         console.log("Status Code : ",response.status);
         if(response.data.trim =="Item Added Successfully!"){
           console.log("Hello New Item");
           alert("Item Added Successfully!");
            this.setState({   
            })
         }
         updateFlag=true;
         this.setState({   
        })
     })
        }
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        if(cookie.load('cookie')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        let goBack=null;
        if(updateFlag){
            console.log("Hello Addition");
            updateFlag=false;
            goBack=window.location.reload();
        }

        return(
            <div>
                {redirectVar}
                {goBack}
            <div>
               
                   
                    <form>
                        <div class="panel">
                            
                            <h4>Add Item</h4>
                            
                        </div>
                        <div class="form-group">
                                <input ref={(ref)=> this.itemname=ref} onChange = {this.onChangeHandler} type="text" class="form-control" name="itemname" placeholder="Item Name" required/>
                            </div>
                            
                            <div class="form-group">
                                <input ref={(ref)=> this.description=ref} onChange = {this.onChangeHandler} type="text" class="form-control" name="description" placeholder="Description" required/>
                            </div>
                            <div class="form-group">
                            <Dropdown ref={ref => (this.section = ref)}  options={this.state.options}  onChange={this.sectionChangeHandler} name="section" placeholder="Section"  value={this.state.section}  />
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.price=ref} onChange = {this.onChangeHandler} type="number" class="form-control" name="price" placeholder="Price" required/>
                            </div>
                            
                            <button onClick = {this.submitForm} class="btn btn-primary3" type="submit">Add</button>                 

                            </form>
                    </div>
                   
                    </div>
           
        )
    }
}


export default AddItem;