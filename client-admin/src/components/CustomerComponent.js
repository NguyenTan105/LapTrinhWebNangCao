import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null,
    };
  }
  render() {
    const customers = this.state.customers.map((item) => {
      return (
        <div
          key={item._id}
          className="products-row"
          onClick={() => this.trCustomerClick(item)}
        >
          <div className="product-cell id">{item._id.slice(-4)}</div>
          <div className="product-cell username">{item.username}</div>
          <div className="product-cell password">{item.password}</div>
          <div className="product-cell cusName">{item.name}</div>
          <div className="product-cell phone">{item.phone}</div>
          <div className="product-cell email">{item.email}</div>
          <div className="product-cell active">{item.active}</div>
          <div className="product-cell action">
            {item.active === 0 ? (
              <span className="link" onClick={() => this.lnkEmailClick(item)}>
                EMAIL
              </span>
            ) : (
              <span
                className="link"
                onClick={() => this.lnkDeactiveClick(item)}
              >
                DEACTIVE
              </span>
            )}
          </div>
        </div>
      );
    });
    const orders = this.state.orders.map((item) => {
      return (
        <div
          key={item._id}
          className="products-row"
          onClick={() => this.trOrderClick(item)}
        >
          <div className="product-cell id">{item._id.slice(-4)}</div>
          <div className="product-cell cdate">
            {new Date(item.cdate).toLocaleString()}
          </div>
          <div className="product-cell cusName">{item.customer.name}</div>
          <div className="product-cell phone">{item.customer.phone}</div>
          <div className="product-cell total">{item.total}</div>
          <div className="product-cell status">{item.status}</div>
        </div>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <div key={item.product._id} className="products-row">
            <div className="product-cell id">{index + 1}</div>
            <div className="product-cell id">{item.product._id.slice(-4)}</div>
            <div className="product-cell name">{item.product.name}</div>
            <div className="product-cell image">
              <img
                src={"data:image/jpg;base64," + item.product.image}
                width="70px"
                height="70px"
                alt=""
              />
            </div>
            <di className="product-cell price">{item.product.price}</di>
            <div className="product-cell quantity">{item.quantity}</div>
            <div className="product-cell price">
              {item.product.price * item.quantity}
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <div className="main p-3 app-container">
          <Link to="/admin/customer" style={{ color: "aqua" }}>
            <h3>Customer list</h3>
          </Link>
          <div className="products-area-wrapper tableView">
            <div className="products-header">
              <div className="product-cell id">ID</div>
              <div className="product-cell username">Username</div>
              <div className="product-cell password">Password</div>
              <div className="product-cell cusName">Name</div>
              <div className="product-cell phone">Phone</div>
              <div className="product-cell email">Email</div>
              <div className="product-cell active">Active</div>
              <div className="product-cell action">Action</div>
            </div>
            {customers}
            {this.state.orders.length > 0 ? (
              <div className="my-3">
                <Link to="/admin/customer" style={{ color: "white" }}>
                  <h3>Order list</h3>
                </Link>
                <div className="tableView">
                  <div className="products-header">
                    <div className="product-cell id">ID</div>
                    <div className="product-cell cdate">Creation date</div>
                    <div className="product-cell cusName">Cust.name</div>
                    <div className="product-cell phone">Cust.phone</div>
                    <div className="product-cell total">Total</div>
                    <div className="product-cell status">Status</div>
                  </div>
                  {orders}
                  {this.state.order ? (
                    <div className="my-3">
                      <Link to="/admin/customer" style={{ color: "white" }}>
                        <h3>Order detail</h3>
                      </Link>
                      <div className="tableView">
                        <div className="products-header">
                          <div className="product-cell id">No.</div>
                          <div className="product-cell id">Prod.ID</div>
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
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCustomers();
  }
  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }
  trOrderClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetCustomers() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/customers", config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }
  apiGetOrdersByCustID(cid) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/orders/customer/" + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  // event-handlers
  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }
  // apis
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .put("/api/admin/customers/deactive/" + id, body, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          this.apiGetCustomers();
        } else {
          alert("SORRY BABY!");
        }
      });
  }
  // event-handlers
  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }
  // apis
  apiGetCustomerSendmail(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/customers/sendmail/" + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Customer;
