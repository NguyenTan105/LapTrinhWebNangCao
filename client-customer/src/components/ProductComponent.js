import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductComponent.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("default");
  const { cid, keyword } = useParams();

  useEffect(() => {
    if (cid) {
      apiGetProductsByCatID(cid);
    } else if (keyword) {
      apiGetProductsByKeyword(keyword);
    }
  }, [cid, keyword]);

  const apiGetProductsByCatID = (cid) => {
    axios.get("/api/customer/products/category/" + cid).then((res) => {
      setProducts(res.data);
    });
  };

  const apiGetProductsByKeyword = (keyword) => {
    axios.get("/api/customer/products/search/" + keyword).then((res) => {
      setProducts(res.data);
    });
  };

  const cmbSortChange = (sort) => {
    let sortedProducts = [...products];
    if (sort === "name ASC") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name DESC") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "price ASC") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price DESC") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  const prods = products.map((item) => (
    <div key={item._id} className="card-field col-3">
      <figure className="card-figure">
        <Link
          to={"/product/" + item._id}
          className="d-flex justify-content-center"
        >
          <img
            src={"data:image/jpg;base64," + item.image}
            width="300px"
            height="300px"
            alt=""
          />
        </Link>
        <figcaption className="d-flex flex-column">
          <span className="nameProd">{item.name}</span>
          <span className="priceProd">Price: {item.price} Đ</span>
        </figcaption>
      </figure>
    </div>
  ));

  return (
    <div className="home py-2">
      <div className="container" style={{ marginBottom: "40px" }}>
        <div>
          <Link style={{ textDecoration: "none", color: "black" }} to="/home">
            Home /{" "}
          </Link>
          {cid && (
            <span>
              Category ID: <b>{cid}</b>
            </span>
          )}
          {keyword && (
            <span>
              Search Keyword: <b>{keyword}</b>
            </span>
          )}
        </div>
        <h2 className="text-center">LIST PRODUCTS</h2>
        <div style={{ marginBottom: "20px" }}>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              cmbSortChange(e.target.value);
            }}
          >
            <option value="default">------Sort by------</option>
            <option value="name ASC">Name (a &#8594; z)</option>
            <option value="name DESC">Name (z &#8594; a)</option>
            <option value="price ASC">Price (low &#8594; high)</option>
            <option value="price DESC">Price (high &#8594; low)</option>
          </select>
        </div>
        <div className="d-flex justify-content-center align-content-center">
          <div className="row col-12">{prods}</div>
        </div>
      </div>
    </div>
  );
}

export default Product;
