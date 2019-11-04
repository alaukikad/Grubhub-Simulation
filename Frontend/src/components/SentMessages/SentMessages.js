import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import hostAddress from "../constants";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import ReactPaginate from "react-paginate";
// import {pastOrder} from '../../js/actions/orders';
// import { connect } from "react-redux";

let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

class SentMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      //for pagination
      paginated_messages: null,
      results_per_page: 2,
      num_pages: 0,
      status: [],
      inc: []
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    console.log("I am here");
    const data = {
      email: cookie.load("email")
    };

    axios.defaults.withCredentials = true;
    axios
      .post(
        "http://" + hostAddress + ":3001/getSentMessage/getSentMessage",
        data,
        config
      )
      .then(response => {
        console.log(response.data);
        let arr = response.data.slice(0, this.state.results_per_page);
        const pages = Math.ceil(
          response.data.length / this.state.results_per_page
        );
        this.setState({
          message: response.data,
          num_pages: pages,
          paginated_messages: arr
        });
      });
  }

  handlePageClick(data) {
    console.log(data.selected);
    let page_number = data.selected;
    let offset = Math.ceil(page_number * this.state.results_per_page);
    this.setState({
      paginated_messages: this.state.message.slice(
        offset,
        offset + this.state.results_per_page
      )
    });
  }

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    // if(cookie.load('cookie')=="restaurant"){
    //     redirectVar = <Redirect to= "/login"/>
    // }
    let display = [];
    let details;
    if (this.state.paginated_messages != null) {
      details = this.state.paginated_messages.map(msg => {
        console.log(msg);
        console.log(" Yahahhahahahs");
        display.push(
          <div class="container">
            <br></br>
            <div>
              <b>Restaurant : {msg.receiver}</b>
            </div>
            <div>
              {" "}
              <small>Date : {msg.date.substring(0, 10)}</small>
            </div>
            <div>
              <h5> {msg.body}</h5>
            </div>
          </div>
        );
      });
    } else {
      details = <div style={{ margin: "35px" }}> Nothing to Show!:(</div>;
    }

    return (
      <div>
        {redirectVar}

        <div
          class="container"
          style={{ backgroundColor: "white", width: "60%", opacity: "80%" }}
        >
          <h3>Sent Messages</h3>

          {details}
          {display}
          <div className="row" style={{ margin: "30px" }}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.num_pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SentMessages;
