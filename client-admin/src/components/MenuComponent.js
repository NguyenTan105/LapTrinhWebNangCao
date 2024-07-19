import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Category from "./CategoryComponent";
import Product from "./ProductComponent";
import Order from "./OrderComponent";
import Customer from "./CustomerComponent";
import Statistics from "./StatisticsComponent";
import Home from "./HomeComponent";
class Menu1 extends Component {
  static contextType = MyContext; // using this.context to access global state

  componentDidMount() {
    const hamBurger = document.querySelector("#toggle-btn");
    hamBurger.addEventListener("click", this.handleToggle);
  }

  componentWillUnmount() {
    const hamBurger = document.querySelector("#toggle-btn");
    hamBurger.removeEventListener("click", this.handleToggle);
  }

  handleToggle = () => {
    document.querySelector("#sidebar").classList.toggle("expand");
  };

  lnkLogoutClick = () => {
    this.context.setToken("");
    this.context.setUsername("");
    localStorage.removeItem("admin_token");
  };

  render() {
    return (
      <div className="wrapper">
        <aside id="sidebar">
          <div className="d-flex">
            <button id="toggle-btn" className="toggle-btn" type="button">
              <i className="lni lni-grid-alt"></i>
            </button>
            <div className="sidebar-logo">
              <Link href="/admin/home">
                <b>{this.context.username}</b>
              </Link>
            </div>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/home">
                <i class="lni lni-home"></i> <span>Home</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/category">
                <i className="lni lni-agenda"></i> <span>Category</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/product">
                <i class="lni lni-delivery"></i> <span>Product</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/order">
                <i class="lni lni-shopping-basket"></i> <span>Order</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/customer">
                <i class="lni lni-customer"></i> <span>Customer</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/statistics">
                <i class="lni lni-dashboard"></i> <span>Statistics</span>
              </Link>
            </li>
          </ul>
          <div className="sidebar-footer">
            <Link
              className="sidebar-link"
              to="/admin"
              onClick={() => this.lnkLogoutClick()}
            >
              <i className="lni lni-exit"></i> <span>Logout</span>
            </Link>
          </div>
        </aside>
        <Routes>
          <Route
            path="/admin"
            element={<Navigate replace to="/admin/home" />}
          />
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/order" element={<Order />} />
          <Route path="/admin/customer" element={<Customer />} />
          <Route path="/admin/statistics" element={<Statistics />} />
        </Routes>
      </div>
    );
  }
}

export default Menu1;
