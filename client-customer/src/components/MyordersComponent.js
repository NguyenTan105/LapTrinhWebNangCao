import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }
  render() {
    if (this.context.token === "") return <Navigate replace to="/login" />;
    const orders = this.state.orders.map((item) => {
      return (
        <li
          className="list-group-item d-flex justify-content-between lh-condensed"
          key={item._id}
          onClick={() => this.trItemClick(item)}
        >
          <div className="d-flex">
            <div>
              <h6 className="my-0">ID: {item._id}</h6>
              <small className="text-muted">
                Creation date: {new Date(item.cdate).toLocaleString()} /{" "}
              </small>
              <small className="text-muted"></small>
            </div>
          </div>
          <div>
            <span className="text-muted">Name: {item.customer.name} / </span>
            <span className="text-muted">PN: {item.customer.phone} / </span>
            <span>Total: {item.total} / </span>
            <span>{item.status}</span>
          </div>
        </li>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <li
            key={item.product._id}
            className="list-group-item d-flex justify-content-between lh-condensed"
          >
            <div className="d-flex">
              <div style={{ marginRight: "10px" }}>
                <img
                  src={"data:image/jpg;base64," + item.product.image}
                  alt=""
                  width="40px"
                  height="40px"
                />
              </div>
              <div>
                <h6 className="my-0">{item.product.name}</h6>
                <small className="text-muted">ID: {item.product._id} / </small>
                <small className="text-muted">
                  {item.product.category.name}
                </small>
              </div>
            </div>
            <div>
              <span className="text-muted">
                Price: {item.product.price} Đ /{" "}
              </span>
              <span className="text-muted">Quanlity: {item.quantity} / </span>
              <span className="text-muted">
                Amount: {item.product.price * item.quantity} Đ
              </span>
            </div>
          </li>
        );
      });
    }
    return (
      <div>
        <div className="container">
          <div className="row my-3">
            <div className="col-md-12 py-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Order list</span>
              </h4>
              <ul className="list-group mb-3">{orders}</ul>
            </div>
            {this.state.order ? (
              <div className="col-md-12">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Order detail</span>
                </h4>
                <ul className="list-group mb-3">{items}</ul>
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
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/customer/orders/customer/" + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Myorders;
