import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import CartUtil from "../utils/CartUtil";
import axios from "axios";
import withRouter from "../utils/withRouter";
import { Link } from "react-router-dom";

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div className="d-flex">
            <div style={{ marginRight: "10px" }}>
              <img
                src={"data:image/jpg;base64," + item.product.image}
                alt=""
                width="40px"
                height="40px"
              />
            </div>
            <div>
              <h6 className="my-0">{item.product.name}</h6>
              <small className="text-muted">ID: {item.product._id} / </small>
              <small className="text-muted">{item.product.category.name}</small>
            </div>
          </div>
          <div>
            <span className="text-muted">Price: {item.product.price} Đ / </span>
            <span className="text-muted">Quanlity: {item.quantity} / </span>
            <span className="text-muted">
              Amount: {item.product.price * item.quantity} Đ /
            </span>
            <span
              className="link"
              onClick={() => this.lnkRemoveClick(item.product._id)}
            >
              Remove
            </span>
          </div>
        </li>
      );
    });

    return (
      <div className="align-center">
        <h2 className="text-center">ITEM LIST</h2>
        <div className="container">
          <div className="row my-4">
            <div className="col-md-12 py-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <Link to="/mycart">
                  <i
                    className="fa badge fa-lg"
                    value={this.context.mycart.length}
                  >
                    &#xf290;
                  </i>
                </Link>
              </h4>
              <ul className="list-group mb-3">
                {mycart}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (VND)</span>
                  <strong>{CartUtil.getTotal(this.context.mycart)} Đ</strong>
                </li>
              </ul>

              <form className="card p-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Promo code"
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-secondary">
                      Redeem
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-12 ">
              <h4 className="mb-3">Payment</h4>

              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    checked
                    required
                  />
                  <label className="custom-control-label" for="credit">
                    Credit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label" for="debit">
                    Debit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label" for="paypal">
                    PayPal
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label for="cc-name">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label for="cc-number">Credit card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label for="cc-expiration">Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label for="cc-cvv">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>
              <hr className="mb-4" />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                onClick={() => this.lnkCheckoutClick()}
              >
                Continue to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex((x) => x.product._id === id);
    if (index !== -1) {
      // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
  // event-handlers
  lnkCheckoutClick() {
    if (window.confirm("ARE YOU SURE?")) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate("/login");
        }
      } else {
        alert("Your cart is empty");
      }
    }
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { "x-access-token": this.context.token } };
    axios.post("/api/customer/checkout", body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("Successfully!");
        this.context.setMycart([]);
        this.props.navigate("/home");
      } else {
        alert("Failed!");
      }
    });
  }
}
export default withRouter(Mycart);
