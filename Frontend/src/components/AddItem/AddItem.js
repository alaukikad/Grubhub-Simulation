import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

let updateFlag=false;

//Define a Login Component
class AddItem extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            itemname : "",
            description: "",
            price : "",
            image : "",
            section : "",
            options : []
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

     //make a post request with the user data
     axios.post('http://localhost:3001/getSection',data)
     .then((response) => {
     //update the state with the response data
    // alert(response.data)
     this.setState({
         options : response.data
     });
 });

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
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : cookie.load('email'),
            itemname : this.state.itemname,
            description: this.state.description,
            price : this.state.price,
            section : this.state.section
        }

if(this.itemname.value=="" || this.description.value=="" ||this.section.value=="" ||this.price.value=="" ){
alert("Please fill all Fields!");
}else{
    // this.props.registerRestaurant(data);
    // store.subscribe(() => {
    //     // When state will be updated(in our case, when items will be fetched), 
    //     // we will update local component state and force component to rerender 
    //     // with new data.
    //     console.log(cookie.load('cookie'));
    //     console.log(this.props.propData);
    //     this.setState({
    //       username: store.getState().username
    //     });
    //   });


     //set the with credentials to true
     axios.defaults.withCredentials = true;
     //make a post request with the user data
 
     axios.post('http://localhost:3001/additem',data)
     .then(response => {
         alert(response.data);
         console.log("Status Code : ",response.status);
         if(response.data.trim() == "Item Added Successfully!"){
           console.log("Hello New Item");
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
               
                   
                    <form action="http://127.0.0.1:3000/additem" method="post">
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
                            <div class="form-group">
                            <input value={this.state.image} name="image" type="file" accept="image/png, image/jpeg" onChange={this.onChangeHandler}/>
                            </div>
                            <button onClick = {this.submitForm} class="btn btn-primary3" type="submit">Add</button>                 

                            </form>
                    </div>
                   
                    </div>
           
        )
    }
}


export default AddItem;