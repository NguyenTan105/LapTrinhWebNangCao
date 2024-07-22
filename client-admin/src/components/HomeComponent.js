import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MyContext from "../contexts/MyContext";
import "./HomeComponent.css";
class Home extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      noCategories: 0,
      noProducts: 0,
      noOrders: 0,
      noOrdersPending: 0,
      noOrdersApproved: 0,
      noOrdersCanceled: 0,
      noOrdersRevenue: 0,
      noCustomers: 0,
    };
  }

  componentDidMount() {
    this.apiGetStatistics();
  }

  apiGetStatistics() {
    const config = {
      headers: { "x-access-token": this.context.token },
    };
    axios.get("/api/admin/statistics", config).then((res) => {
      const result = res.data;
      this.setState({
        noCategories: result.noCategories,
        noProducts: result.noProducts,
        noOrders: result.noOrders,
        noOrdersPending: result.noOrdersPending,
        noOrdersApproved: result.noOrdersApproved,
        noOrdersCanceled: result.noOrdersCanceled,
        noOrdersRevenue: result.noOrdersRevenue,
        noCustomers: result.noCustomers,
      });
    });
  }
  render() {
    return (
      <div className="main p-3">
        <Link to="/admin/home" style={{ color: "aqua" }}>
          <h3>Home</h3>
        </Link>
        <h2 className="text-center">
          Welcome to <h2 className="animate-charcter">Dreamy Toys</h2>
        </h2>
        <h3 style={{ marginTop: "3rem" }}>Statistics</h3>
        <main class="content-wrap">
          <div class="content">
            <section class="info-boxes">
              <div class="info-box">
                <div class="box-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M22 19V7c0-1.1-.9-2-2-2H12l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2z" />
                    <path d="M2 10h20" />
                  </svg>
                </div>

                <div class="box-content">
                  <span class="big">{this.state.noCategories}</span>
                  Categories
                </div>
              </div>

              <div class="info-box">
                <div class="box-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 10H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1zm-1 10H5v-8h14v8zM5 6h14v2H5zM7 2h10v2H7z" />
                  </svg>
                </div>

                <div class="box-content">
                  <span class="big">{this.state.noProducts}</span>
                  Products
                </div>
              </div>

              <div class="info-box active">
                <div class="box-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3,21c0,0.553,0.448,1,1,1h16c0.553,0,1-0.447,1-1v-1c0-3.714-2.261-6.907-5.478-8.281C16.729,10.709,17.5,9.193,17.5,7.5 C17.5,4.468,15.032,2,12,2C8.967,2,6.5,4.468,6.5,7.5c0,1.693,0.771,3.209,1.978,4.219C5.261,13.093,3,16.287,3,20V21z M8.5,7.5 C8.5,5.57,10.07,4,12,4s3.5,1.57,3.5,3.5S13.93,11,12,11S8.5,9.43,8.5,7.5z M12,13c3.859,0,7,3.141,7,7H5C5,16.141,8.14,13,12,13z" />
                  </svg>
                </div>

                <div class="box-content">
                  <span class="big">{this.state.noCustomers}</span>
                  Customers
                </div>
              </div>

              <div class="info-box">
                <div class="box-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3C6.486 3 2 6.364 2 10.5c0 2.742 1.982 5.354 5 6.678V21a.999.999 0 0 0 1.707.707l3.714-3.714C17.74 17.827 22 14.529 22 10.5 22 6.364 17.514 3 12 3zm0 13a.996.996 0 0 0-.707.293L9 18.586V16.5a1 1 0 0 0-.663-.941C5.743 14.629 4 12.596 4 10.5 4 7.468 7.589 5 12 5s8 2.468 8 5.5-3.589 5.5-8 5.5z" />
                  </svg>
                </div>

                <div class="box-content">
                  <span class="big">{this.state.noOrdersPending}</span>
                  Orders pending
                </div>
              </div>

              <div class="info-box">
                <div class="box-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="approved"
                  >
                    <path d="M20.292 6.708c.392.392.392 1.023 0 1.415l-9.999 10.000-5-5a.998.998 0 0 1 0-1.415c.391-.391 1.024-.391 1.415 0l3.584 3.584 8.584-8.584c.391-.391 1.023-.391 1.416 0z" />
                  </svg>
                </div>

                <div class="box-content">
                  <span class="big">{this.state.noOrdersApproved}</span>
                  Orders aprroved
                </div>
              </div>

              <div class="info-box">
                <div class="box-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="canceled"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L16.59 17 12 12.41 7.41 17 6 15.59 10.59 11 6 6.41 7.41 5 12 9.59 16.59 5 18 6.41 13.41 11 18 15.59z" />
                  </svg>
                </div>

                <div class="box-content">
                  <span class="big">{this.state.noOrdersCanceled}</span>
                  Orders canceled
                </div>
              </div>

              <div class="info-box">
                <div class="box-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 20V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1zm-2-1H5V5h14v14z" />
                    <path d="M10.381 12.309l3.172 1.586a1 1 0 0 0 1.305-.38l3-5-1.715-1.029-2.523 4.206-3.172-1.586a1.002 1.002 0 0 0-1.305.38l-3 5 1.715 1.029 2.523-4.206z" />
                  </svg>
                </div>

                <div class="box-content">
                  <span class="big">{this.state.noOrdersRevenue}</span>
                  Orders revenue
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}
export default Home;
