import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import hostAddress from "../constants";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import ReactPaginate from "react-paginate";
import {getMessage} from '../../js/actions/message';
import { connect } from "react-redux";

let msgSend = null;
let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

class ReceivedMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      message2: "",
      //for pagination
      paginated_messages: null,
      results_per_page: 2,
      num_pages: 0,
      status: [],
      inc: []
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.showMsg = this.showMsg.bind(this);
    this.onMessageChangeHandler = this.onMessageChangeHandler.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.cancelMessage = this.cancelMessage.bind(this);
  }

  componentDidMount() {
    console.log("I am here");
    const data = {
      email: cookie.load("email")
    };

    this.props.getMessage(data);
    if(this.props.message!=null){
      let arr = this.props.message.slice(0, this.state.results_per_page);
      const pages = Math.ceil(
        this.props.message.length / this.state.results_per_page
      );
      this.setState({
        num_pages: pages,
        paginated_messages: arr
      });
    }else{
      this.setState({
        num_pages: 0,
        paginated_messages: null
      });
    }
    // axios.defaults.withCredentials = true;
    // axios
    //   .post(
    //     "http://" + hostAddress + ":3001/getMessage/getMessage",
    //     data,
    //     config
    //   )
    //   .then(response => {
    //     console.log(response.data);
    //     let arr = response.data.slice(0, this.state.results_per_page);
    //     const pages = Math.ceil(
    //       response.data.length / this.state.results_per_page
    //     );
    //     this.setState({
    //       message: response.data,
    //       num_pages: pages,
    //       paginated_messages: arr
    //     });
    //   });
  }

  cancelMessage = e => {
    msgSend = null;
    this.setState({
      message2 : ""
    });
  };

  sendMessage = e => {
    if (this.state.message2 != "") {
      const data = {
        receiver: msgSend,
        sender: cookie.load("email"),
        body: this.state.message2
      };
      console.log(data)
      axios.defaults.withCredentials = true;
      axios
        .post(
          "http://" + hostAddress + ":3001/sendMessage/sendMessage",
          data,
          config
        )
        .then(response => {
          console.log(response);
          alert(response.data);
          msgSend = null;
        });
    } else {
      alert(" Please enter Message!");
    }
  };


  showMsg = e => {
    msgSend = e.target.name;
    console.log("Hellooooo there alau")
    console.log(msgSend)
    console.log("Hellooooo there alauw222")
    this.setState({});
  };

  onMessageChangeHandler = e => {
    this.setState({
      message2: e.target.value
    });
  };


  handlePageClick(data) {
    console.log(data.selected);
    let page_number = data.selected;
    let offset = Math.ceil(page_number * this.state.results_per_page);
  
    console.log(this.props.message.slice(
      offset,
      offset + this.props.results_per_page
    ))
    this.setState({
      paginated_messages: this.props.message.slice(
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
    let msgDisplay = null;
    if (msgSend != null) {
      msgDisplay = (
        <div>
          <form>
            <input
              type="text"
              onChange={this.onMessageChangeHandler}
              style={{ height: "40px" }}
              placeholder="Type Your Text Here"
            ></input>
            <button
              class="btn btn-primary8"
              onClick={this.sendMessage}
              style={{ margin: "5px" }}
            >
              Send
            </button>
            <button
              class="btn btn-primary9"
              onClick={this.cancelMessage}
              style={{ margin: "5px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      );
    }

    if (this.state.paginated_messages != null) {
      details = this.state.paginated_messages.map(msg => {
        console.log(msg);
        console.log(" Yahahhahahahs");
        display.push(
          <div class="container">
            <br></br>
            <div>
              <b>Sender : {msg.sender}</b>
            </div>
            <div>
              {" "}
              <small>Date : {msg.date.substring(0, 10)}</small>
            </div>
            <div>
              <h5> {msg.body}</h5>
            </div>
            <button
                        class="btn btn-primary7"
                        name={msg.sender}
                        onClick={this.showMsg}
                      >
                        Reply
                      </button>
                      <div style={{ padding: "10px", margin: "5px" }}>
                        {msgDisplay}
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
          <h3>Received Messages</h3>

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

//export default ReceivedMessages;

function mapDispatchToProps(dispatch) {
  return {
    getMessage: user => dispatch(getMessage(user))
  };
}

function mapStateToProps(store) {
  return {
    message: store.receivedMessage
  };
}

const ReceivedMessagesC = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceivedMessages);
export default ReceivedMessagesC;