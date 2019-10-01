import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import SearchFood from '../SeachFood/SearchFood';


class Chome extends Component {
    constructor(props){
        super(props);
        this.state = {  
           
        }
    }  
    //get the books data from backend  
    

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
       if(!cookie.load('cookie'))
        {
            console.log("Able to read cookie ahjsajhdj");
            redirectVar = <Redirect to= "/login"/>
        }
        else if(cookie.load('cookie'))
        {
            redirectVar = <Redirect to= "/chome"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                <SearchFood/>     
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Chome;