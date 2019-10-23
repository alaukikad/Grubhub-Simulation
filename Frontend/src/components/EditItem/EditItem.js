import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Rmenu from '../Rmenu/Rmenu';
import hostAddress from '../constants';

let updateFlag=false;

//Define a Login Component
class EditItem extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            secList :[],
            itemname : "",
            description: "",
            price : "",
            image : "",
            file : "",
            section : "",
            options : []
        }
        //Bind the handlers to this class
        
        this.sectionChangeHandler= this.sectionChangeHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.updateImage= this.updateImage.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
   componentWillMount(){
   const data={
       email: cookie.load('email')
   }
     //set the with credentials to true
     axios.defaults.withCredentials = true;

     //make a post request with the user data

        axios.post('http://'+hostAddress+':3001/getSection/getSection',data)
        .then((response) => {
        //update the state with the response data
        console.log("here")
        console.log(response.data)
        let o=[]
        let temp=response.data.map( sec=>{
           o.push(sec.value);
        })
    
        this.setState({
            oimage: "",
            secList : response.data,
            options : o
        });
    })

    //  axios.post('http://localhost:3001/getSection',data)
    //  .then((response) => {
    //  //update the state with the response data
   
    //  this.setState({
    //      options : response.data
    //  });
    // })
console.log(this.props.ItemID);
     const data2={
        id: this.props.ItemID
    }
     axios.post('http://'+hostAddress+':3001/getItem/getItem',data2)
     .then((response) => {
     //update the state with the response data
     //alert(response.data)
     this.setState({
        itemname : response.data.itemname,
        description: response.data.desc,
        price : response.data.price,
        image : response.data.image,
        section : response.data.sid
     });
    })
   }

    //email change handler to update state variable with the text entered by the user
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    imageChangeHandler = e => {
        this.setState({
          file: e.target.files[0]
        })
      }

    sectionChangeHandler = (value) => {
        console.log(value.value);
        this.setState({
            section : value.value
        })
        
    }
    updateImage = (e)=>{
        console.log(" me ithee")
        e.preventDefault()
        const formData = new FormData()
        console.log(this.state.file.name)
        formData.append('myImage', this.state.file, this.state.file.name)
        formData.append('mid', this.props.ItemID)
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        axios
          .post('http://'+hostAddress+':3001/itemuploadimage', formData, config)
          .then(response => {
            console.log('Image uploaded')
            console.log(response.data.filename)
            this.setState({
              oimage: "http://"+hostAddress+":3001/images/all/" + response.data.filename+ ""
            })
          })
          .catch(error => { })
   }
    //submit Register handler to send a request to the node backend
    submitForm= (e) => {
        // var headers = new Headers();
        // var scid;
        // for(var i=0;i<this.state.secList.length;i++){
        //     if(this.state.section== this.state.secList[i].value){
        //      scid=this.state.secList[i].key;
        //     break;
        //     }
        // }
        //prevent page from refresh
        e.preventDefault();
        //alert(this.state.section)
        const data = {
            id: this.props.ItemID,
            itemname : this.state.itemname,
            description: this.state.description,
            price : this.state.price,
           // sid : scid,
            sid: this.state.section,
            image : this.state.image
        }

if(this.itemname.value=="" || this.description.value=="" ||this.section.value=="" ||this.price.value=="" ){
alert("Please fill all Fields!");
}else{
     //set the with credentials to true
     axios.defaults.withCredentials = true;
     //make a post request with the user data
 
     axios.post('http://'+hostAddress+':3001/edititem/edititem',data)
     .then(response => {
         alert(response.data)
         console.log("Status Code : ",response.status);
         if(response.data.trim() == "Details Updated!"){
           console.log("Hello Edited Item");
           if(this.state.file!="")
             this.updateImage(e);
          // alert(response.data);
            this.setState({
            })
         }
         console.log("Updated Flag");
         updateFlag=true;
         this.setState({})
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
            console.log("Hello");
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
                            
                            <h4>Edit Item</h4>
                            
                        </div>
                        <div class="form-group">
                                <input ref={(ref)=> this.itemname=ref} value={this.state.itemname} onChange = {this.onChangeHandler} type="text" class="form-control" name="itemname" placeholder="Item Name" required/>
                            </div>
                            
                            <div class="form-group">
                                <input ref={(ref)=> this.description=ref}  value={this.state.description} onChange = {this.onChangeHandler} type="text" class="form-control" name="description" placeholder="Description" required/>
                            </div>
                            <div class="form-group">
                            <Dropdown ref={ref => (this.section = ref)}  options={this.state.options}  onChange={this.sectionChangeHandler} name="section" placeholder="Section"  value={this.state.section}  />
                            </div>
                            <div class="form-group">
                                <input ref={(ref)=> this.price=ref}  value={this.state.price} onChange = {this.onChangeHandler} type="number" class="form-control" name="price" placeholder="Price" required/>
                            </div>
                            <div class="form-group">
                            <input  name="image" type="file" accept="image/png, image/jpeg" onChange={this.imageChangeHandler}/>
                            </div>
                            <button onClick = {this.submitForm} class="btn btn-primary3" type="submit">Edit</button>                 

                            </form>
                    </div>
                   
                    </div>
           
        )
    }
}

export default EditItem;