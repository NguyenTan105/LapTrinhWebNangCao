import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import "./LoginComponent.css";
class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      currentImage: 1,
      showPassword: false,
    };
  }
  render() {
    if (this.context.token === "") {
      return (
        <div className="">
          <div className="l-form">
            <div className="shape1"></div>
            <div className="shape2"></div>

            <div className="form">
              <form className="form__content">
                <h1 className="form__title">Admin</h1>

                <div className="form__div form__div-one">
                  <div className="form__icon">
                    <i className="bx bx-user-circle"></i>
                  </div>

                  <div className="form__div-input">
                    <label htmlFor="username" className="form__label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form__input"
                      onChange={(e) =>
                        this.setState({ txtUsername: e.target.value })
                      }
                      value={this.state.txtUsername}
                      onFocus={this.addFocus}
                      onBlur={this.removeFocus}
                    />
                  </div>
                </div>

                <div className="form__div">
                  <div className="form__icon">
                    <i className="bx bx-lock"></i>
                  </div>

                  <div className="form__div-input">
                    <label htmlFor="password" className="form__label">
                      Password
                    </label>
                    <input
                      id="password"
                      type={this.state.showPassword ? "text" : "password"}
                      className="form__input"
                      onChange={(e) =>
                        this.setState({ txtPassword: e.target.value })
                      }
                      value={this.state.txtPassword}
                      onFocus={this.addFocus}
                      onBlur={this.removeFocus}
                    />
                    <span onClick={() => this.handleShowHidePass()}>
                      <i
                        className={
                          this.state.showPassword
                            ? "far fa-eye"
                            : "far fa-eye-slash"
                        }
                      ></i>
                    </span>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Login"
                  onClick={(e) => this.btnLoginClick(e)}
                  className="form__button"
                />
              </form>
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert("Please input username and password");
    }
  }
  componentDidMount() {
    const token = localStorage.getItem("admin_token");
    if (token) this.apiGetAccount(token);

    const inputs = document.querySelectorAll(".form__input");
    /*=== Add focus ===*/
    inputs.forEach((input) => {
      input.addEventListener("focus", this.addFocus);
      input.addEventListener("blur", this.removeFocus);
    });
  }
  addFocus = (event) => {
    const parent = event.target.parentNode.parentNode;
    parent.classList.add("focus");
  };

  removeFocus = (event) => {
    const { value } = event.target;
    const parent = event.target.parentNode.parentNode;
    if (value === "") {
      parent.classList.remove("focus");
    }
  };
  handleShowHidePass = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  // apis
  apiLogin(account) {
    axios.post("/api/admin/login", account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
        localStorage.setItem("admin_token", result.token);
        this.setState({
          txtUsername: "",
          txtPassword: "",
        });
      } else {
        alert(result.message);
      }
    });
  }
  apiGetAccount(token) {
    const config = { headers: { "x-access-token": token } };
    axios.get("/api/admin/account", config).then((res) => {
      const result = res.data;
      this.context.setToken(token);
      this.context.setUsername(result.username);
    });
  }
}
export default Login;
