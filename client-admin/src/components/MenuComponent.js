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
import "./MenuComponent.css";
class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state

  componentDidMount() {
    const hamBurger = document.querySelector("#toggle-btn");
    hamBurger.addEventListener("click", this.handleToggle);

    // Adding the script for active class
    this.addActiveClassScript();
    // Set default active item
    this.setActiveItem();
  }

  componentWillUnmount() {
    const hamBurger = document.querySelector("#toggle-btn");
    hamBurger.removeEventListener("click", this.handleToggle);

    // Removing the script for active class
    this.removeActiveClassScript();
  }

  handleToggle = () => {
    document.querySelector("#sidebar").classList.toggle("expand");
  };

  lnkLogoutClick = () => {
    this.context.setToken("");
    this.context.setUsername("");
    localStorage.removeItem("admin_token");
  };

  addActiveClassScript = () => {
    var header = document.getElementById("sidebar-nav");
    var btns = header.getElementsByClassName("sidebar-item");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", this.handleActiveClass);
    }
  };

  removeActiveClassScript = () => {
    var header = document.getElementById("sidebar-nav");
    var btns = header.getElementsByClassName("sidebar-item");
    for (var i = 0; i < btns.length; i++) {
      btns[i].removeEventListener("click", this.handleActiveClass);
    }
  };

  handleActiveClass = (event) => {
    var current = document.getElementsByClassName("active");
    if (current[0]) {
      current[0].className = current[0].className.replace(" active", "");
    }
    event.currentTarget.className += " active";
  };

  setActiveItem = () => {
    const currentPath = window.location.pathname;
    const sidebarNav = document.getElementById("sidebar-nav");
    const links = sidebarNav.getElementsByTagName("a");

    for (let link of links) {
      if (link.getAttribute("href") === currentPath) {
        link.parentElement.classList.add("active");
        break;
      }
    }

    // Set default to home if no active item found
    const current = document.getElementsByClassName("active");
    if (current.length === 0) {
      sidebarNav
        .querySelector("a[href='/admin/home']")
        .parentElement.classList.add("active");
    }
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
              <Link to="/admin/home">
                <b>{this.context.username}</b>
              </Link>
            </div>
          </div>
          <ul id="sidebar-nav" className="sidebar-nav">
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/home">
                <i className="lni lni-home"></i> <span>Home</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/category">
                <i className="lni lni-agenda"></i> <span>Category</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/product">
                <i className="lni lni-delivery"></i> <span>Product</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/order">
                <i className="lni lni-shopping-basket"></i> <span>Order</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/customer">
                <i className="lni lni-customer"></i> <span>Customer</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin/statistics">
                <i className="lni lni-dashboard"></i> <span>Statistics</span>
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

export default Menu;
