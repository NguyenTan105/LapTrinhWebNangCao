import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "./SliderComponent";
import "./HomeComponent.css";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="card-field col-3">
          <figure>
            <Link
              to={"/product/" + item._id}
              className="d-flex justify-content-center"
            >
              <img
                src={"data:image/jpg;base64," + item.image}
                width="250px"
                height="250px"
                alt=""
              />
            </Link>
            <figcaption className="">
              <span className="nameProd">{item.name}</span>
              <br />
              <span className="priceProd">Price: {item.price} Đ</span>
            </figcaption>
          </figure>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="card-field d-flex col-3">
          <figure>
            <Link
              to={"/product/" + item._id}
              className="d-flex justify-content-center"
            >
              <img
                src={"data:image/jpg;base64," + item.image}
                width="250px"
                height="250px"
                alt=""
              />
            </Link>
            <figcaption className="">
              <span className="nameProd">{item.name}</span>
              <br />
              <span className="priceProd">Price: {item.price} Đ</span>
            </figcaption>
          </figure>
        </div>
      );
    });
    return (
      <div className="home">
        <Slider />
        <div style={{ height: 30 }}></div>
        <div className="container">
          <div>
            <h2 className="text-center" style={{ color: "black" }}>
              NEW PRODUCTS
            </h2>
            <div className="d-flex justify-content-center align-content-center">
              {newprods}
            </div>
            {this.state.hotprods.length > 0 ? (
              <div className="py-5">
                <h2 className="text-center">
                  <b style={{ color: "red" }}>HOT PRODUCTS</b>
                </h2>
                <div className="d-flex justify-content-center align-content-center">
                  {hotprods}
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
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get("/api/customer/products/new").then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get("/api/customer/products/hot").then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;
