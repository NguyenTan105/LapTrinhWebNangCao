import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import "./ProductDetailComponent.css";

const ProductDetail = () => {
  const { id, cid, keyword } = useParams(); // Get parameters from URL
  const [product, setProduct] = useState(null);
  const [txtQuantity, setTxtQuantity] = useState(1);
  const [imgSelected, setImgSelected] = useState(null);
  const context = useContext(MyContext); // Access global state

  useEffect(() => {
    if (id) {
      apiGetProduct(id);
    }
  }, [id]);

  const apiGetProduct = async (id) => {
    try {
      const response = await axios.get(`/api/customer/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  const btnAdd2CartClick = (e) => {
    e.preventDefault();
    if (product) {
      const quantity = parseInt(txtQuantity);
      if (quantity) {
        const mycart = context.mycart;
        const index = mycart.findIndex((x) => x.product._id === product._id);
        if (index === -1) {
          const newItem = { product: product, quantity: quantity };
          mycart.push(newItem);
        } else {
          mycart[index].quantity += quantity;
        }
        context.setMycart(mycart);
        alert("Successfully!");
      } else {
        alert("Please input quantity");
      }
    }
  };

  if (product) {
    return (
      <div className="product-detail">
        <div className="container py-2">
          <div>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home">
              Home /{" "}
            </Link>
            <span>
              Product ID: <b>{id}</b>
            </span>
          </div>
          <h2 className="text-center" style={{ marginTop: "40px" }}>
            PRODUCT DETAILS
          </h2>
          <figure className="d-flex justify-content-center align-content-center">
            <div className="row col-12">
              <div className="col-6 d-flex flex-column align-items-end">
                {imgSelected === null ? (
                  <img
                    src={`data:image/jpg;base64,${product.image}`}
                    width="400px"
                    height="400px"
                    alt=""
                  />
                ) : (
                  <img
                    src={`data:image/jpg;base64,${imgSelected}`}
                    width="400px"
                    height="400px"
                    alt=""
                  />
                )}
                <div className="align-center">
                  {product.imageDetails.map((image, index) => (
                    <img
                      key={index}
                      src={`data:image/jpg;base64,${image}`}
                      width="100px"
                      height="100px"
                      alt=""
                      onClick={() => setImgSelected(image)}
                    />
                  ))}
                </div>
              </div>
              <figcaption className="col-5 d-flex justify-content-start align-items-center">
                <form className="d-flex flex-column">
                  <div className="form-group">
                    <div className="form-row">
                      <div className="form-label">ID:</div>
                      <div className="form-value">{product._id}</div>
                    </div>
                    <div className="form-row">
                      <div className="form-label">Name:</div>
                      <div className="form-value">{product.name}</div>
                    </div>
                    <div className="form-row">
                      <div className="form-label">Price:</div>
                      <div className="form-value">{product.price}</div>
                    </div>
                    <div className="form-row">
                      <div className="form-label">Category:</div>
                      <div className="form-value">{product.category.name}</div>
                    </div>
                    <div className="form-row">
                      <div className="form-label">Quantity:</div>
                      <div className="form-value">
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={txtQuantity}
                          onChange={(e) => setTxtQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mx-auto">
                      <div className="form-value">
                        <input
                          type="submit"
                          value="ADD TO CART"
                          onClick={btnAdd2CartClick}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    );
  }
  return <div />;
};

export default ProductDetail;
