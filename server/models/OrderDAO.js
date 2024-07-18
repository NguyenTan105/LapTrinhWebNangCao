require("../utils/MongooseUtil");
const Models = require("./Models");

const OrderDAO = {
  async insert(order) {
    const mongoose = require("mongoose");
    order._id = new mongoose.Types.ObjectId();
    const result = await Models.Order.create(order);
    return result;
  },
  async selectByCustID(_cid) {
    const query = { "customer._id": _cid };
    const orders = await Models.Order.find(query).exec();
    return orders;
  },
  async selectAll() {
    const query = {};
    const mysort = { cdate: -1 }; // descending
    const orders = await Models.Order.find(query).sort(mysort).exec();
    return orders;
  },
  async update(_id, newStatus) {
    const newvalues = { status: newStatus };
    const result = await Models.Order.findByIdAndUpdate(_id, newvalues, {
      new: true,
    });
    return result;
  },
  // Method to count all orders
  async selectByCount() {
    const query = {};
    const noOrders = await Models.Order.find(query).countDocuments().exec();
    return noOrders;
  },
  // Method to count orders by status
  async selectByCountStatus(status) {
    const query = { status: status };
    const noOrders = await Models.Order.find(query).countDocuments().exec();
    return noOrders;
  },
  // Method to sum the total of approved orders
  async sumTotalApproved() {
    const query = { status: "APPROVED" };
    const orders = await Models.Order.find(query).exec();
    const sum = orders.reduce((sum, order) => sum + order.total, 0);
    return sum;
  },
};
module.exports = OrderDAO;
