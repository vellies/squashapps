module.exports = app => {
  const ingredients = require("../controllers/ingredients.controller.js");

  var router = require("express").Router();

  // Create a new ingredients
  router.post("/", ingredients.create);

  // Retrieve all ingredients
  router.get("/", ingredients.findAll);

  // Retrieve a single ingredients with id
  router.get("/:id", ingredients.findOne);

  // Update a ingredients with id
  router.put("/:id", ingredients.update);

  // update Delete a ingredients with id
  router.get("/deleteIngredients/:id", ingredients.deleteIngredients);

  app.use('/api/ingredients', router);
};