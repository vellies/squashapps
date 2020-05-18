module.exports = app => {
  const foods = require("../controllers/food.controller.js");

  var router = require("express").Router();

  // Create a new Food
  router.post("/", foods.create);

  // Retrieve all Tutorials
  router.get("/", foods.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", foods.findOne);

  // Update a Tutorial with id
  router.put("/:id", foods.update);

  // update Delete a Food with id
  router.get("/deleteFood/:id", foods.deleteFood);

  app.use('/api/foods', router);
};