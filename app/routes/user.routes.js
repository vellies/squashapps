module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new Users
  router.post("/signup", users.create);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Retrieve all User
  router.get("/", users.findAll);

  // Retrieve login users
  router.post("/login", users.login);

  // updateUser a Users with id
  router.put("/updateUser/:id", users.updateUser);

  // update User Password a Users with id
  router.put("/updateUserPassword/:id", users.updateUserPassword);

  // update Delete a Users with id
  router.get("/deleteUser/:id", users.deleteUser);

  app.use('/api/users', router);
};