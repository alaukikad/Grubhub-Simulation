import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';

class Rhome extends Component {
    constructor(){
        super();
        this.state = {  
           
        }
    }  
    //get the books data from backend  
    componentDidMount(){
       /* axios.get('http://localhost:3001/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    books : this.state.books.concat(response.data) 
                });
            });*/
    }

    render(){
        //iterate over books to create a table row
        /*let details = this.state.books.map(book => {
            return(
                <tr>
                    <td>{book.BookID}</td>
                    <td>{book.Title}</td>
                    <td>{book.Author}</td>
                </tr>
            )
        })*/
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Restaurant Home</h2>
                        
                </div> 
            </div> 
        )
    }
}

Rhome.propTypes = {
    username: PropTypes.object.isRequired,
    password: PropTypes.func.isRequired
}
//export Home Component
export default Rhome;