import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
import MyContext from "../contexts/MyContext";
import "./MenuComponent.css";
class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: "",
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu">
          <Link className="dropdown-item" to={"/product/category/" + item._id}>
            {item.name}
          </Link>
        </li>
      );
    });
    return (
      <div className="menu-bar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <Link class="navbar-brand" href="#">
              <h2 className="animate-charcter">Dreamy Toys</h2>
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
              <ul
                class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                style={{ "--bs-scroll-height": "100px" }}
              >
                <li class="nav-item">
                  <Link to="/" class="nav-link" aria-current="page" href="#">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/gmap" class="nav-link" href="#">
                    Google Map
                  </Link>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    {cates}
                  </ul>
                </li>
                <li>
                  <form class="d-flex">
                    <input
                      className="form-control me-2 keyword"
                      type="search"
                      placeholder="Enter keyword"
                      aria-label="Search"
                      value={this.state.txtKeyword}
                      onChange={(e) => {
                        this.setState({ txtKeyword: e.target.value });
                      }}
                    />
                    <button
                      onClick={(e) => this.btnSearchClick(e)}
                      class="btn btn-outline-secondary"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                </li>
              </ul>

              <div className="nav-item dropdown">
                <Link
                  style={{
                    padding: "5px",
                    marginRight: "10px",
                  }}
                  className="nav-link"
                  href="#"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {this.context.token === "" ? (
                    "Account"
                  ) : (
                    <span>
                      Account, <b>{this.context.customer.name}</b>
                    </span>
                  )}
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  {this.context.token === "" ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/signup">
                          Sign-up
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/active">
                          Active
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/myprofile">
                          My profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/myorders">
                          My orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/home"
                          onClick={() => this.lnkLogoutClick()}
                        >
                          Logout
                        </Link>
                      </li>
                      {/* <li>
                        <div className="dropdown-item">
                          <Link to="/mycart">My cart</Link> have{" "}
                          <b>{this.context.mycart.length}</b> items
                        </div>
                      </li> */}
                    </>
                  )}
                </ul>
              </div>
              <div style={{ display: "inline" }} class="form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  onChange={(e) => this.ckbChangeMode(e)}
                />
                &nbsp;
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get("/api/customer/categories").then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
    localStorage.removeItem("customer_token");
  }
  // event-handlers-search
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate("/product/search/" + this.state.txtKeyword);
  }
  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }
}
export default withRouter(Menu);
