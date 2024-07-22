import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import "./MyprofileComponent.css";
class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
      avatar: "",
    };
  }
  render() {
    if (this.context.token === "") return <Navigate replace to="/login" />;
    return (
      <div className="container my-5">
        <form className="">
          <div className="align-center row ">
            <div className="col-5 ">
              <div className="col-12 d-flex justify-content-center">
                <img
                  src={this.state.avatar}
                  width="200px"
                  height="200px"
                  alt=""
                  style={{ borderRadius: "100px" }}
                />
              </div>
              <div className="col-12 d-flex justify-content-center mt-2">
                <input
                  type="file"
                  name="fileImage"
                  accept="image/jpeg, image/png, image/gif"
                  onChange={(e) => this.previewImage(e)}
                  style={{ width: "210px" }}
                />
              </div>
            </div>

            <div className="col-7 row ">
              <h2 style={{ padding: "0" }} className="col-12">
                Profile Settings
              </h2>
              <div className="col-6 form__group field">
                <input
                  className="form__field"
                  type="text"
                  value={this.state.txtUsername}
                  onChange={(e) => {
                    this.setState({ txtUsername: e.target.value });
                  }}
                  id="username"
                  name="username"
                />
                <label for="username" class="form__label">
                  Username
                </label>
              </div>
              <div className="col-5 form__group field">
                <input
                  className="form__field"
                  type="password"
                  value={this.state.txtPassword}
                  onChange={(e) => {
                    this.setState({ txtPassword: e.target.value });
                  }}
                  id="password"
                  name="password"
                />
                <label for="password" class="form__label">
                  Password
                </label>
              </div>
              <div className="col-6 form__group field">
                <input
                  className="form__field"
                  type="text"
                  value={this.state.txtName}
                  onChange={(e) => {
                    this.setState({ txtName: e.target.value });
                  }}
                  id="name"
                  name="name"
                />
                <label for="name" class="form__label">
                  Name
                </label>
              </div>
              <div className="col-5 form__group field">
                <input
                  className="form__field"
                  type="tel"
                  value={this.state.txtPhone}
                  onChange={(e) => {
                    this.setState({ txtPhone: e.target.value });
                  }}
                  id="phone"
                  name="phone"
                />
                <label for="phone" class="form__label">
                  Phone
                </label>
              </div>
              <div className="col-6 form__group field">
                <input
                  className="form__field"
                  type="email"
                  value={this.state.txtEmail}
                  onChange={(e) => {
                    this.setState({ txtEmail: e.target.value });
                  }}
                  id="email"
                  name="email"
                />
                <label for="email" class="form__label">
                  Email
                </label>
              </div>
              <div className="col-12 py-4 d-flex flex-column align-items-center justify-content-center">
                <input
                  style={{ minWidth: "150px" }}
                  type="submit"
                  value="UPDATE"
                  onClick={(e) => this.btnUpdateClick(e)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        avatar: this.context.customer.avatar,
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const avatar = this.state.avatar;
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = {
        avatar: avatar,
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert("Please input username and password and name and phone and email");
    }
  }
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ avatar: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/customer/customers/" + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("Successfully!");
        this.context.setCustomer(result);
      } else {
        alert("Failed!");
      }
    });
  }
}
export default Myprofile;
