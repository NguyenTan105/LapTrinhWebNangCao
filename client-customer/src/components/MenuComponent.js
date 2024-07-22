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
      isDarkMode: false, // Thêm state để theo dõi chế độ sáng/tối
    };
  }

  // Phương thức xử lý thay đổi chế độ sáng/tối
  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      this.setState({ isDarkMode: true });
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
      this.setState({ isDarkMode: false });
    }
  }

  render() {
    // Import ảnh dựa trên chế độ sáng/tối
    const horse = require("./horse.png");
    const whiteHorse = require("./white_horse.png");
    const currentHorseImage = this.state.isDarkMode ? whiteHorse : horse;

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
          <div className="container">
            <Link className="navbar-brand" to="/home">
              <img
                style={{
                  marginRight: "6px",
                  position: "relative",
                  bottom: "3px",
                }}
                src={currentHorseImage}
                alt="Horse"
                width="40px"
                height="40px"
              />
              <h2 className="animate-charcter">Dreamy Toys</h2>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li>
                  <form
                    className="d-flex"
                    onSubmit={(e) => this.btnSearchClick(e)}
                  >
                    <input
                      className="me-2 keyword search__input"
                      type="search"
                      placeholder="Enter keyword"
                      aria-label="Search"
                      value={this.state.txtKeyword}
                      onChange={(e) =>
                        this.setState({ txtKeyword: e.target.value })
                      }
                    />
                  </form>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/gmap" className="nav-link">
                    Google Map
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    {cates}
                  </ul>
                </li>
              </ul>

              <div className="nav-item dropdown account">
                <Link
                  style={{
                    padding: "5px",
                    marginRight: "0px",
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
                      <img
                        src={this.context.customer.avatar}
                        alt=""
                        width="30px"
                        height="30px"
                        style={{ borderRadius: "90px", marginRight: "5px" }}
                      />
                      <b>{this.context.customer.name}</b>
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
                    </>
                  )}
                </ul>
              </div>
              <div className="float-right">
                <Link to="/mycart">
                  <i
                    className="fa badge fa-lg"
                    value={this.context.mycart.length}
                  >
                    &#xf290;
                  </i>
                </Link>{" "}
              </div>
              <div style={{ display: "inline" }} className="form-switch">
                <input
                  className="form-check-input"
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

  // APIs
  apiGetCategories() {
    axios.get("/api/customer/categories").then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  // Event Handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
    localStorage.removeItem("customer_token");
  }

  // Event Handlers - Search
  btnSearchClick(e) {
    e.preventDefault();
    if (this.state.txtKeyword.trim() !== "") {
      this.props.navigate(
        "/product/search/" + encodeURIComponent(this.state.txtKeyword)
      );
    } else {
      console.log("Keyword cannot be empty");
    }
  }
}

export default withRouter(Menu);
