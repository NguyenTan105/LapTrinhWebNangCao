import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import ProductDetail from "./ProductDetailComponent";
import { Link } from "react-router-dom";
import "./ProductComponent.css";
class Product1 extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div
          key={item._id}
          className="products-row"
          onClick={() => this.trItemClick(item)}
        >
          <div className="product-cell id">
            <span className="cell-label">ID:</span>
            {/* {item._id} */}
            {item._id.slice(-4)}
          </div>
          <div className="product-cell name">
            <span className="cell-label">Name:</span>
            {item.name}
          </div>
          <div className="product-cell price">
            <span className="cell-label">Price:</span>
            {item.price}
          </div>
          <div className="product-cell cdate">
            {new Date(item.cdate).toLocaleString()}
          </div>
          <div className="product-cell category">
            <span className="cell-label">Category:</span>
            {item.category.name}
          </div>
          <div className="product-cell image">
            <img
              src={"data:image/jpg;base64," + item.image}
              width="100px"
              height="100px"
              alt=""
            />
          </div>
          <div className="product-cell imageDetail">
            {item.imageDetails.length > 0 ? (
              item.imageDetails.map((image, index) => (
                <img
                  key={index}
                  src={`data:image/jpg;base64,${image}`}
                  width="100px"
                  height="100px"
                  alt=""
                />
              ))
            ) : (
              <span>n/a</span>
            )}
          </div>
        </div>
      );
    });
    const pagination = Array.from(
      { length: this.state.noPages },
      (_, index) => {
        if (index + 1 === this.state.curPage) {
          return (
            <span key={index} style={{ color: "yellow" }}>
              | <b>{index + 1}</b> |
            </span>
          );
        } else {
          return (
            <span
              key={index}
              className="link"
              onClick={() => this.lnkPageClick(index + 1)}
            >
              | {index + 1} |
            </span>
          );
        }
      }
    );
    return (
      <div className="main p-3 app-container">
        <Link to="/admin/home" style={{ color: "aqua" }}>
          <h3>Product</h3>
        </Link>
        <div className="products-area-wrapper tableView">
          <div className="products-header">
            <div className="product-cell id">ID</div>
            <div className="product-cell name">Items</div>
            <div className="product-cell price">Price</div>
            <div className="product-cell cdate">Create date</div>
            <div className="product-cell category">Categories</div>
            <div className="product-cell image">Image</div>
            <div className="product-cell imageDetail">Image detail</div>
          </div>
          {prods}
          <div className="footer">{pagination}</div>
          <div>
            <ProductDetail
              item={this.state.itemSelected}
              curPage={this.state.curPage}
              updateProducts={this.updateProducts}
            />
          </div>
        </div>
      </div>
    );
  }
  updateProducts = (products, noPages, curPage) => {
    // arrow-function
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  };
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/products?page=" + page, config).then((res) => {
      const result = res.data;
      this.setState({
        products: result.products,
        noPages: result.noPages,
        curPage: result.curPage,
      });
    });
  }
}
export default Product1;
