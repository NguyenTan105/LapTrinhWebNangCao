import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import CategoryDetail from "./CategoryDetailComponent";
import { Link } from "react-router-dom";

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null,
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <div
          key={item._id}
          className="products-row"
          onClick={() => this.trItemClick(item)}
        >
          <div className="product-cell id">{item._id.slice(-4)}</div>
          <div className="product-cell name">{item.name}</div>
        </div>
      );
    });
    return (
      <div className="main p-3 app-container">
        <Link to="/admin/category" style={{ color: "aqua" }}>
          <h3>Category list</h3>
        </Link>
        <div className="products-area-wrapper tableView">
          <div className="products-header">
            <div className="product-cell id">ID</div>
            <div className="product-cell name">Name</div>
          </div>
          {cates}
          <div>
            <CategoryDetail
              item={this.state.itemSelected}
              updateCategories={this.updateCategories}
            />
          </div>
        </div>
      </div>
    );
  }
  updateCategories = (categories) => {
    // arrow-function
    this.setState({ categories: categories });
  };
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/categories", config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default Category;
