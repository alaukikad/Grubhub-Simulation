import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
//import store from '../../js/store/index';
//import { connect } from "react-redux";
//import { updateCProfile } from "../../js/actions/index";

class Cupdateprofile extends Component {
    constructor(props){
            super(props);
            this.state = {  
                uid : "",
                email : "",
                fullname: "",
                contact: "",
                address : "",
                file: "",
                oimage :""
            }
        
            // store.subscribe(() => {
            //   // When state will be updated(in our case, when items will be fetched), 
            //   // we will update local component state and force component to rerender 
            //   // with new data.
            //   this.setState({
            //     email: store.getState().email
            //   });
            // });
          
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitProfile = this.submitProfile.bind(this);
    }  
    //get the books data from backend  
    componentDidMount(){
       // console.log(this.props.propData);
        console.log("I am in component");
        console.log(cookie.load("email"));

        const data = {
            email : cookie.load("email")
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.post('http://localhost:3001/cprofile/cprofile',data)
                .then((response) => {
                
                this.setState({
                uid : response.data.uid,
                email: response.data.email,
                fullname: response.data.name,
                contact: response.data.contact,
                address : response.data.address,
                oimage : "http://localhost:3001/images/all/" + response.data.image+ "" 
                });

              //  var b64encoded = btoa(String.fromCharCode.apply(null, response.data.image));
                //image.src = 'data:image/jpeg;base64,' + b64encoded;
                //var buffer=new Buffer(response.data.oimage);
                // var bufferBase64 = this.state.oimage.toString('base64');
                // console.log(bufferBase64);
            });
    }


    onChangeHandler = (e) => {
        this.setState({
           [e.target.name] : e.target.value
        });
    }

    imageChangeHandler = e => {
        this.setState({
          file: e.target.files[0]
        })
      }


    submitProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh

        e.preventDefault()
        const formData = new FormData()
        console.log(this.state.file.name)
        formData.append('myImage', this.state.file, this.state.file.name)
        formData.append('uid', this.state.uid)
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        axios
          .post('http://localhost:3001/cprofileuploadimage', formData, config)
          .then(response => {
            console.log('Image uploaded')
            console.log(response.data.filename)
            this.setState({
              oimage: "http://localhost:3001/images/all/" + response.data.filename+ ""
            })
          })
          .catch(error => { })

        e.preventDefault();
        const data = {
            pemail :cookie.load("email"),
            email : this.state.email,
            fullname: this.state.fullname,
            contact: this.state.contact,
            address : this.state.address
        }

       // this.props.updateCProfile(data);

       axios.defaults.withCredentials = true;
       //make a post request with the user data
       axios.post('http://localhost:3001/cprofileupdate/cprofileupdate',data)
       .then(response => {
       alert(response.data);
       console.log("Status Code : ",response.data);
       if(response.data.trim() == "Details Updated!"){
           console.log("Hello peps I'm in C profile update");
       }         
   })

 
    }
    render(){
      
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(cookie.load('cookie')=="restaurant"){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container split left div-left" style={{ width:"30%"}}>       
                 <img
                  src={this.state.oimage}
                  id="dp"
                  style={{border:"10px solid black" ,marginBottom:"10%",borderColor: "white" ,WebkitBorderRadius: "25%" , height : "200px", width : "200px"}}
                  alt="User Display"
                 />
                </div>
            
                <div class="container split right div-right" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                    
                    <h2>Customer Profile</h2>
                    <form>
                        <table class="table">
                            <tbody>
                               
                                <tr>
                                    <td>Full Name</td>
                                    <td><input value={this.state.fullname} name="fullname" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td><input value={this.state.address} name="address" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Contact </td>
                                    <td><input value={this.state.contact} name="contact" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Email </td>
                                    <td><input value={this.state.email} name="email" onChange={this.onChangeHandler}></input></td>
                                </tr>
                                <tr>
                                    <td>Owner Image </td>
                                    <td><input  name= "oimage" type="file" accept="image/png, image/jpeg" onChange={this.imageChangeHandler}></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" onClick={this.submitProfile} class="btn btn-primary2">Submit</button>
                        </form>
                </div> 
              
               
            </div> 
        )
    }
}
//export Home Component
export default Cupdateprofile;


// function mapStateToProps(state,propData) {
//     return {
//       propData: state.username
//     };
//   }

//   function mapDispatchToProps(dispatch) {
//     return {
//       updateCProfile: user => dispatch(updateCProfile(user))
//     };
//   }

//   const CUpdateProfile = connect(mapStateToProps, mapDispatchToProps)(Cupdateprofile);
//   export default CUpdateProfile;

  


