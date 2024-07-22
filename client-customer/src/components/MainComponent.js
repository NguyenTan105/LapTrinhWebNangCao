import React, { Component } from "react";
import Menu from "./MenuComponent";
import Inform from "./InformComponent";
import Home from "./HomeComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import Product from "./ProductComponent";
import ProductDetail from "./ProductDetailComponent";
import Signup from "./SignupComponent";
import Active from "./ActiveComponent";
import Login from "./LoginComponent";
import Myprofile from "./MyprofileComponent";
import Mycart from "./MycartComponent";
import Myorders from "./MyordersComponent";
import Gmap from "./GmapComponent";
import TawkMessenger from "./TawkMessengerComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Resetpwd from "./ResetpwdComponent";
import MyContext from "../contexts/MyContext";
import axios from "axios";

class Main extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="body-customer ">
        <ToastContainer autoClose={3000} />
        <Menu />
        {/* <Inform /> */}
        <TawkMessenger />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/category/:cid" element={<Product />} />
          <Route path="/product/search/:keyword" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/active" element={<Active />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/mycart" element={<Mycart />} />
          <Route path="/myorders" element={<Myorders />} />
          <Route path="/gmap" element={<Gmap />} />
          <Route path="/resetpwd" element={<Resetpwd />} />
        </Routes>
        <footer class="footer bg-danger">
          <div class="container">
            <div class="row">
              <div class="col-sm-6 col-md-4 mt-4 col-lg-3 text-center text-sm-start">
                <div class="information">
                  <h6 class="footer-heading text-uppercase text-white fw-bold">
                    Information
                  </h6>
                  <ul class="list-unstyled footer-link mt-4">
                    <li class="mb-1">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white text-decoration-none fw-semibold"
                      >
                        Events
                      </a>
                    </li>
                    <li class="mb-1">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white text-decoration-none fw-semibold"
                      >
                        Our Team
                      </a>
                    </li>
                    <li class="mb-1">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white text-decoration-none fw-semibold"
                      >
                        Upcoming Sale
                      </a>
                    </li>
                    <li class="">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white text-decoration-none fw-semibold"
                      >
                        New Launches
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 mt-4 col-lg-3 text-center text-sm-start">
                <div class="resources">
                  <h6 class="footer-heading text-uppercase text-white fw-bold">
                    Resources
                  </h6>
                  <ul class="list-unstyled footer-link mt-4">
                    <li class="mb-1">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white text-decoration-none fw-semibold"
                      >
                        API
                      </a>
                    </li>
                    <li class="mb-1">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white text-decoration-none fw-semibold"
                      >
                        Website Tutorials
                      </a>
                    </li>
                    <li class="mb-1">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white text-decoration-none fw-semibold"
                      >
                        Third Party
                      </a>
                    </li>
                    <li class="">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white text-decoration-none fw-semibold"
                      >
                        Video Lectures
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 mt-4 col-lg-2 text-center text-sm-start">
                <div class="social">
                  <h6 class="footer-heading text-uppercase text-white fw-bold">
                    Social
                  </h6>
                  <ul class="list-inline my-4">
                    <li class="list-inline-item">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white btn-sm btn btn-primary mb-2"
                      >
                        <i class="bi bi-facebook"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-danger btn-sm btn btn-light mb-2"
                      >
                        <i class="bi bi-instagram"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white btn-sm btn btn-primary mb-2"
                      >
                        <i class="bi bi-twitter"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="https://codepen.io/Gaurav-Rana-the-reactor"
                        class="text-white btn-sm btn btn-success mb-2"
                      >
                        <i class="bi bi-whatsapp"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 mt-4 col-lg-4 text-center text-sm-start">
                <div class="contact">
                  <h6 class="footer-heading text-uppercase text-white fw-bold">
                    Contact Us
                  </h6>
                  <address class="mt-4 m-0 text-white mb-1">
                    <i class="bi bi-pin-map fw-semibold"></i> New South Block ,
                    Phase 8B , 160055
                  </address>
                  <a
                    href="tel:+"
                    class="text-white mb-1 text-decoration-none d-block fw-semibold"
                  >
                    <i class="bi bi-telephone"></i> 0942510317
                  </a>
                  <a
                    href="mailto:"
                    class="text-white mb-1 text-decoration-none d-block fw-semibold"
                  >
                    <i class="bi bi-envelope"></i>{" "}
                    tannguyenkhacminh112@gmail.com
                  </a>
                  <a
                    href=""
                    class="text-white text-decoration-none fw-semibold"
                  >
                    <i class="bi bi-skype"></i> tannguyenkhacminh112
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem("customer_token");
    if (token) this.apiGetAccount(token);
  }

  apiGetAccount(token) {
    const config = { headers: { "x-access-token": token } };
    axios.get("/api/customer/account", config).then((res) => {
      const result = res.data;
      this.context.setToken(token);
      this.context.setCustomer(result);
    });
  }
}

export default Main;
