import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: "",
      txtName: "",
      txtPrice: 0,
      cmbCategory: "",
      imgProduct: "",
      imgDetails: [],
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (
          <option
            key={cate._id}
            value={cate._id}
            selected={cate._id === this.props.item.category._id}
          >
            {cate.name}
          </option>
        );
      } else {
        return (
          <option key={cate._id} value={cate._id}>
            {cate.name}
          </option>
        );
      }
    });
    return (
      <div className="main px-3">
        <h2 className="">Product detail</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtID}
                    onChange={(e) => {
                      this.setState({ txtID: e.target.value });
                    }}
                    readOnly={true}
                  />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => {
                      this.setState({ txtName: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtPrice}
                    onChange={(e) => {
                      this.setState({ txtPrice: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Image</td>
                <td>
                  <input
                    type="file"
                    name="fileImage"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={(e) => this.previewImage(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Image details</td>
                <td>
                  <input
                    type="file"
                    name="fileImage"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={(e) => this.previewImageDetails(e)}
                    multiple
                  />
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <select
                    onChange={(e) => {
                      this.setState({ cmbCategory: e.target.value });
                    }}
                  >
                    <option value="select">---select---</option>
                    {cates}
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    type="submit"
                    value="ADD NEW"
                    onClick={(e) => this.btnAddClick(e)}
                  />
                  <input
                    type="submit"
                    value="UPDATE"
                    onClick={(e) => this.btnUpdateClick(e)}
                  />
                  <input
                    type="submit"
                    value="DELETE"
                    onClick={(e) => this.btnDeleteClick(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item?._id || "",
        txtName: this.props.item?.name || "",
        txtPrice: this.props.item?.price || 0,
        cmbCategory: this.props.item?.category?._id || "",
        imgProduct: this.props.item?.image
          ? "data:image/jpg;base64," + this.props.item.image
          : "",
        imgDetails: this.props.item?.imageDetails
          ? this.props.item.imageDetails.map(
              (image) => "data:image/jpg;base64," + image
            )
          : [],
      });
    }
  }

  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  previewImageDetails(e) {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = [];
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (evt) => {
            newImages.push(evt.target.result);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then(() => {
        this.setState({ imgDetails: newImages });
      });
    }
  }

  // apis
  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/categories", config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  apiPostProduct(prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.post("/api/admin/products", prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("Successfully!");
        this.apiGetProducts();
      } else {
        alert("Failed!");
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get("/api/admin/products?page=" + this.props.curPage, config)
      .then((res) => {
        const result = res.data;
        if (result.products.length !== 0) {
          this.props.updateProducts(
            result.products,
            result.noPages,
            result.curPage
          );
        } else {
          const curPage = this.props.curPage - 1;
          axios
            .get("/api/admin/products?page=" + curPage, config)
            .then((res) => {
              const result = res.data;
              this.props.updateProducts(
                result.products,
                result.noPages,
                curPage
              );
            });
        }
      });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .put("/api/admin/products/" + id, prod, config)
      .then((res) => {
        const result = res.data;
        console.log(result);
        if (result) {
          alert("Successfully!");
          this.apiGetProducts();
        } else {
          alert("Failed!");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error updating product. Please try again.");
      });
  }

  apiDeleteProduct(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.delete("/api/admin/products/" + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("Successfully!");
        this.apiGetProducts();
      } else {
        alert("Failed!");
      }
    });
  }

  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(
      /^data:image\/[a-z]+;base64,/,
      ""
    ); // remove "data:image/...;base64,"

    const imageDetails = this.state.imgDetails.map((img) =>
      img.replace(/^data:image\/[a-z]+;base64,/, "")
    ); // remove "data:image/...;base64"

    if (name && price && category && image && imageDetails.length > 0) {
      const prod = {
        name: name,
        price: price,
        category: category,
        image: image,
        imageDetails: imageDetails,
      };
      this.apiPostProduct(prod);
    } else {
      alert(
        "Please input name and price and category and image and image details"
      );
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(
      /^data:image\/[a-z]+;base64,/,
      ""
    ); // remove "data:image/...;base64,"

    const imageDetails = this.state.imgDetails.map((img) =>
      img.replace(/^data:image\/[a-z]+;base64,/, "")
    ); // remove "data:image/...;base64"

    if (
      id &&
      name &&
      price &&
      category &&
      category !== "select" &&
      image &&
      imageDetails.length > 0 // change this condition
    ) {
      const prod = {
        name: name,
        price: price,
        category: category,
        image: image,
        imageDetails: imageDetails,
      };
      this.apiPutProduct(id, prod);
    } else {
      alert(
        "Please input id and name and price and category and image and image details"
      );
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm("ARE YOU SURE?")) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert("Please input id");
      }
    }
  }
}
export default ProductDetail;
