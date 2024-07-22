import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }
  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <div
          key={item._id}
          className="products-row"
          onClick={() => this.trItemClick(item)}
        >
          <div className="product-cell id">{item._id.slice(-4)}</div>
          <div className="product-cell cdate">
            {new Date(item.cdate).toLocaleString()}
          </div>
          <div className="product-cell cusName">{item.customer.name}</div>
          <div className="product-cell phone">{item.customer.phone}</div>
          <div className="product-cell total">{item.total}</div>
          <div className="product-cell status">{item.status}</div>
          <div className="product-cell action">
            {item.status === "PENDING" ? (
              <div>
                <div>
                  <span
                    className="link"
                    onClick={() => this.lnkApproveClick(item._id)}
                  >
                    APPROVE
                  </span>{" "}
                  ||{" "}
                  <span
                    className="link"
                    onClick={() => this.lnkCancelClick(item._id)}
                  >
                    CANCEL
                  </span>
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <div key={item.product._id} className="products-row">
            <div className="product-cell id">{index + 1}</div>
            <div className="product-cell prodId">
              {item.product._id.slice(-4)}
            </div>
            <div className="product-cell name">{item.product.name}</div>
            <div className="product-cell image">
              <img
                src={"data:image/jpg;base64," + item.product.image}
                width="70px"
                height="70px"
                alt=""
              />
            </div>
            <div className="product-cell price">{item.product.price}</div>
            <div className="product-cell quantity">{item.quantity}</div>
            <div className="product-cell total">
              {item.product.price * item.quantity}
            </div>
          </div>
        );
      });
    }
    return (
      <div className="main p-3 app-container">
        <div className="p-2">
          <Link to="/admin/order" style={{ color: "aqua" }}>
            <h3>Order list</h3>
          </Link>
          <div className="products-area-wrapper tableView ">
            <div className="products-header">
              <div className="product-cell id">ID</div>
              <div className="product-cell cdate">Creation date</div>
              <div className="product-cell cusName">Name</div>
              <div className="product-cell phone">Phone</div>
              <div className="product-cell total">Total</div>
              <div className="product-cell status">Status</div>
              <div className="product-cell action">Action</div>
            </div>
            {orders}
            {this.state.order ? (
              <div className="my-3 px-3">
                <Link to="/admin/order" style={{ color: "white" }}>
                  <h3>Order detail</h3>
                </Link>
                <div className="tableView">
                  <div className="products-header">
                    <div className="product-cell id">No.</div>
                    <div className="product-cell prodId">Prod.ID</div>
                    <div className="product-cell name">Prod.name</div>
                    <div className="product-cell image">Image</div>
                    <div className="product-cell price">Price</div>
                    <div className="product-cell quantity">Quantity</div>
                    <div className="product-cell amount">Amount</div>
                  </div>
                  {items}
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrders() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/orders", config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  // event-handlers
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, "APPROVED");
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, "CANCELED");
  }
  // apis
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/admin/orders/status/" + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert("SORRY BABY!");
      }
    });
  }
}
export default Order;
