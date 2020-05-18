module.exports = app => {
  const order = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new order
  router.post("/", order.create);

  // Retrieve all order
  router.get("/", order.findAll);

  // Retrieve a single order with id
  router.get("/:id", order.findOne);

  // Update a order with id
  router.put("/:id", order.update);

  // update Delete a Order with id
  router.get("/deleteOrder/:id", order.deleteOrder);

  app.use('/api/orders', router);
};