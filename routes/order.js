const express = require("express");
const order = require("../controllers/order");
const router = express.Router();

//order routes
router.post('/add', order.createOrder); // create order
router.get('/device/:id', order.getOrderByDeviceId); // get all device orders
router.put('/:id', order.updateOrderStatus); // update order
router.route("/").get(order.getAllOrders).delete(order.deleteAllOrders); // get all orders or delete all orders
router.route("/:id").get(order.getOrderById).delete(order.deleteOrderById); // get order by id or delete order by id

module.exports = router;
