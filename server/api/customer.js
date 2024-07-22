const express = require("express");
const router = express.Router();
// daos
const CategoryDAO = require("../models/CategoryDAO");
const ProductDAO = require("../models/ProductDAO");
const CustomerDAO = require("../models/CustomerDAO");
const OrderDAO = require("../models/OrderDAO");
// utils
const CryptoUtil = require("../utils/CryptoUtil");
const EmailUtil = require("../utils/EmailUtil");
const bcrypt = require("bcrypt");
const JwtUtil = require("../utils/JwtUtil");
// mycart
router.post("/checkout", JwtUtil.checkToken, async function (req, res) {
  const now = new Date().getTime(); // milliseconds
  const total = req.body.total;
  const items = req.body.items;
  const customer = req.body.customer;
  const order = {
    cdate: now,
    total: total,
    status: "PENDING",
    customer: customer,
    items: items,
  };
  const result = await OrderDAO.insert(order);
  res.json(result);
});
// customer
router.post("/signup", async function (req, res) {
  const { username, password, name, phone, email } = req.body;

  try {
    const dbCust = await CustomerDAO.selectByUsernameOrEmail(username, email);
    if (dbCust) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date().getTime(); // milliseconds
    const token = CryptoUtil.md5(now.toString());
    const newCust = {
      username,
      password: password,
      name,
      phone,
      email,
      active: 0,
      token,
    };
    const result = await CustomerDAO.insert(newCust);

    if (result) {
      const send = await EmailUtil.send(email, result._id, token);
      if (send) {
        res.json({ success: true, message: "Please check your email" });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Email sending failed" });
      }
    } else {
      res
        .status(500)
        .json({ success: false, message: "Database insert failed" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});
// myprofile
router.put("/customers/:id", JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const avatar = req.body.avatar;
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const customer = {
    _id: _id,
    avatar: avatar,
    username: username,
    password: password,
    name: name,
    phone: phone,
    email: email,
  };
  const result = await CustomerDAO.update(customer);
  res.json(result);
});

// customer
router.post("/active", async function (req, res) {
  const _id = req.body.id;
  const token = req.body.token;
  const result = await CustomerDAO.active(_id, token, 1);
  res.json(result);
});
// customer
router.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    const customer = await CustomerDAO.selectByUsernameAndPassword(
      username,
      password
    );
    if (customer) {
      if (customer.active === 1) {
        const token = JwtUtil.genToken(customer._id);
        res.json({
          success: true,
          message: "Authentication successful",
          token: token,
          customer: customer,
        });
      } else {
        res.json({ success: false, message: "Account is deactive" });
      }
    } else {
      res.json({ success: false, message: "Incorrect username or password" });
    }
  } else {
    res.json({ success: false, message: "Please input username and password" });
  }
});
router.get("/token", JwtUtil.checkToken, function (req, res) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  const id = req.decoded.id;
  res.json({ success: true, message: "Token is valid", token: token, id: id });
});
//login
router.get("/account", JwtUtil.checkToken, async function (req, res) {
  const id = req.decoded.id;
  const customer = await CustomerDAO.selectById(id);
  res.json(customer);
});
// category
router.get("/categories", async function (req, res) {
  try {
    const categories = await CategoryDAO.selectAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});
// myorders
router.get(
  "/orders/customer/:cid",
  JwtUtil.checkToken,
  async function (req, res) {
    const _cid = req.params.cid;
    const orders = await OrderDAO.selectByCustID(_cid);
    res.json(orders);
  }
);
// product
router.get("/products/new", async function (req, res) {
  try {
    const products = await ProductDAO.selectTopNew(3);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/products/hot", async function (req, res) {
  try {
    const products = await ProductDAO.selectTopHot(3);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/products/category/:cid", async function (req, res) {
  const _cid = req.params.cid;

  try {
    const products = await ProductDAO.selectByCatID(_cid);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/products/search/:keyword", async function (req, res) {
  const keyword = req.params.keyword;

  try {
    const products = await ProductDAO.selectByKeyword(keyword);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/products/:id", async function (req, res) {
  const _id = req.params.id;

  try {
    const product = await ProductDAO.selectByID(_id);
    res.json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});
// Route để gửi email reset mật khẩu
router.get("/sendmail/:email", async function (req, res) {
  const email = req.params.email;
  try {
    const dbCust = await CustomerDAO.selectByEmail(email);
    if (!dbCust) {
      res.json({ success: false, message: "Not exists email" });
    } else {
      const send = await EmailUtil.send(email, dbCust._id, dbCust.token);
      if (send) {
        res.json({ success: true, message: "Please check email" });
      } else {
        res.json({ success: false, message: "Email failure" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error!", error: error.message });
  }
});
// Route để reset mật khẩu
router.post("/resetpwd", async function (req, res) {
  const _id = req.body.id;
  const token = req.body.token;
  const password = req.body.password;
  try {
    const result = await CustomerDAO.resetpwd(_id, token, password);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error!", error: error.message });
  }
});
module.exports = router;
