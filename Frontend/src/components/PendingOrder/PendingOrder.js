import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import hostAddress from "../constants";
import { pendingOrder } from "../../js/actions/orders";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

let msgSend = null;
let orderList;
let total = [];
let ix = 0;
let currArr=[]; 
let c = -1;
let arr = [];
let editMode = false;
let statusMap;
let updateFlag = false;
let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "grey" : "white",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "pink" : "white",
  padding: grid
  //width: 250
});

class PendingOrder extends Component {
  constructor(props) {
    super(props);
    orderList = new Map();
    statusMap = new Map();
    this.state = {
      options: ["Delivered", "Cancelled", "Ready", "Preparing"],
      //for pagination
      paginated_orders: null,
      results_per_page: 2,
      num_pages: 0,
      status: [],
      inc: []
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.statusChangeHandler = this.statusChangeHandler.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.showMsg = this.showMsg.bind(this);
    this.onMessageChangeHandler = this.onMessageChangeHandler.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.cancelMessage = this.cancelMessage.bind(this);
    this.reorder = this.reorder.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    console.log("I am here");
    const data = {
      email: cookie.load("email")
    };
    this.props.pendingOrder(data);
    // axios.defaults.withCredentials = true;
    // axios.post('http://'+hostAddress+':3001/pendingOrder/pendingOrder',data,config)
    // .then((response) => {
    if (this.props.order != null) {
      let mapping = this.props.order.map(val => {
        for (var i = 0; i < val.orderDetails.length; i++) {
          var obj1 = {
            ID: val._id,
            customer: val.uname,
            uid: val.uid,
            address: val.uaddress,
            item: val.orderDetails[i].itemname,
            price: val.orderDetails[i].price,
            status: val.status,
            quantity: val.orderDetails[i].qty,
            totalPrice:val.price
          };
          if (orderList.has(val._id)) {
            var temp = orderList.get(val._id);
            temp.push(obj1);
            orderList.set(val._id, temp);
          } else {
            arr.push(val._id);
            orderList.set(val._id, [obj1]);
          }
        }
      });
      currArr = arr.slice(0, this.state.results_per_page);
      console.log("Show current sizeeee",arr);
      let currentOrders2 = new Map();
      currArr.forEach(i => {
        currentOrders2.set(i, orderList.get(i));
      });
      console.log("Hellooooo", currentOrders2);
      const pages = Math.ceil(
        arr.length / this.state.results_per_page
      );
      console.log(pages);
      this.setState({
        num_pages: pages,
        paginated_orders: currentOrders2
      });

      //  });
    }
  }

  handlePageClick(data) {
    console.log(data.selected);
    let page_number = data.selected;
    let offset = Math.ceil(page_number * this.state.results_per_page);
    currArr = arr.slice(offset, offset + this.state.results_per_page);
    let currentOrders2 = new Map();
    currArr.forEach(i => {
      currentOrders2.set(i, orderList.get(i));
    });
    this.setState({
      paginated_orders: currentOrders2
    });
  }

  reorder = (list, startIndex, endIndex) => {
    // const result = Array.from(list);
    // const [removed] = result.splice(startIndex, 1);
    // result.splice(endIndex, 0, removed);

    // let currentOrders2 = new Map();
    // result.forEach(i => {
    //   currentOrders2.set(i, this.state.paginated_orders.get(i));
    // });
    console.log(currArr)
    //console.log("Alaukika is checking again")
    let currentOrders2 = new Map();
    for(var i=0;i<currArr.length;i++){
      currentOrders2.set(currArr[this.state.results_per_page-(1+i)],list.get(currArr[this.state.results_per_page-(1+i)]))
    }
    
    return currentOrders2;
  };

  onDragEnd(result) {
    //dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.paginated_orders,
      result.source.index,
      result.destination.index
    );

    this.setState({
      paginated_orders: items
    });
  }

  sendMessage = e => {
    if (this.state.message != "") {
      e.preventDefault();
      const data = {
        receiver: msgSend,
        sender: cookie.load("email"),
        body: this.state.message
      };
      axios.defaults.withCredentials = true;
      axios
        .post(
          "http://"+hostAddress+":3001/sendMessage/sendMessage",
          data,
          config
        )
        .then(response => {
          console.log(response);
          alert(response.data);
          msgSend = null;
          this.setState({
            message2:""
          })
        });
    } else {
      alert(" Please enter Message!");
    }
  };

  cancelMessage = e => {
    msgSend = null;
    this.setState({});
  };

  showMsg = e => {
    msgSend = e.target.name;
    this.setState({});
  };

  onMessageChangeHandler = e => {
    this.setState({
      message: e.target.value
    });
  };
  statusChangeHandler = (value, e) => {
    //console.log(value.value);
    console.log("I am here in change");
    console.log(value);
    console.log(e);
    console.log(e.value);
    statusMap.set(value, e.value);
    console.log(statusMap);
    // price[value.name]
  };

  updateStatus = e => {
    console.log("in here");
    console.log(e.target.name);
    console.log(statusMap);
    // console.log(statusMap.get(parseInt(e.target.name,10)))
    e.preventDefault();
    const data = {
      oid: e.target.name,
      status: statusMap.get(e.target.name)
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data

    axios
      .post(
        "http://" + hostAddress + ":3001/updateOrderStatus/updateOrderStatus",
        data,
        config
      )
      .then(response => {
        alert(response.data);
        console.log("Status Code : ", response.status);
        updateFlag = true;
        this.setState({});
      });
  };

  render() {
    let redirectVar = null;

    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/rlogin" />;
    }
    if (cookie.load("cookie") == "customer") {
      redirectVar = <Redirect to="/rlogin" />;
    }
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
              class="btn btn-primary6"
              onClick={this.sendMessage}
              style={{ margin: "5px" }}
            >
              Send
            </button>
            <button
              class="btn btn-primary5"
              onClick={this.cancelMessage}
              style={{ margin: "5px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      );
    }
    if (updateFlag) {
      updateFlag = false;
      //redirectVar = <Redirect to="/rhome" />;
      redirectVar = window.location.reload()
    }
    let display = [];
    
    let details=null;
    if(this.state.paginated_orders!=null){
    details = this.state.paginated_orders.forEach((v, k, order) => {
      let addData = [];
      ix = arr.indexOf(k) - 1;
      console.log(order);
      console.log(" Yahahhahahaccchs");
      console.log(k);
      console.log(v);
      // let det = v.forEach(det => {
      //   total[c] += det.price;
      //   console.log(det);
      //   addData.push(
      //     <tr class="card">
      //       <td>{det["item"]}</td>
      //       <td></td>
      //       <td>{det.quantity}</td>
      //       <td>${det.price}</td>
      //     </tr>
      //   );
      // });
      display.push(
        <Draggable key={v[0].ID} draggableId={v[0].ID} index={ix}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
        <div
          class="card"
          style={{
            width: " 40rem",
            border: "2px solid grey",
            margin: "5px",
            padding: "8px"
          }}
        >
          <div class="card-body">
            <h4 class="card-title">
              <b>Customer : {v[0].customer}</b>
            </h4>
            <div>
              <h5 class="card-title">Status : {v[0].status}</h5>
              <button
                class="btn btn-primary7"
                name={v[0].rid}
                onClick={this.showMsg}
              >
                Message
              </button>
              <div style={{ padding: "10px", margin: "5px" }}>{msgDisplay}</div>
            </div>
            <div> Address :{v[0].address}</div>
            <div style={{ display: "flex", margin: "10px" }}>
              <Dropdown
                options={this.state.options}
                name="status"
                onChange={this.statusChangeHandler.bind(this, v[0].ID)}
                placeholder="Update Status"
                value={v[0].status}
              />
              <button
                class="btn btn-primary4"
                onClick={this.updateStatus}
                name={v[0].ID}
                style={{ padding: "5px", margin: "5px", borderRadius: "8px" }}
              >
                Update
              </button>
            </div>
            <table class="table">
              <tr
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginTop: "10px"
                }}
              >
                <td>Item Name</td>
                <td></td>
                <td>Item Quantity</td>
                <td>Item Price</td>
              </tr>
              <tbody>
              {v.forEach(det => {
                        total[c] += det.price;
                        console.log(det);
                        addData.push(
                          <tr class="card">
                            <td>{det["item"]}</td>
                            <td></td>
                            <td>{det.quantity}</td>
                            <td>${det.price}</td>
                          </tr>
                        );
                      })}
                      {addData}
              
              </tbody>
            </table>

            <div>
              <hr></hr>
              <pre>
                <b> Total Amount : ${v[0].totalPrice} </b>
              </pre>
              <hr></hr>
            </div>
          </div>
        </div>
        </div>
            )}
          </Draggable>
      );

      total[++c] = 0;
      addData = [];
    });}
    else{
        details=<div style={{margin:"35px"}}> Nothing to Show!:(</div>
    }
    return (
      <div>
        {redirectVar}

        <div
          class="container"
          style={{ backgroundColor: "white", width: "60%", opacity: "80%" }}
        >
          <h3>Pending Orders</h3>
          <hr></hr>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
          {details}
          {display}
          {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="row" style={{margin:"30px"}}>
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

//export default PendingOrder;

function mapDispatchToProps(dispatch) {
  return {
    pendingOrder: user => dispatch(pendingOrder(user))
  };
}

function mapStateToProps(store) {
  return {
    order: store.pendingOrder
  };
}

const PendingOrderC = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingOrder);
export default PendingOrderC;
