const db = require("../models");
const Food = db.foods;

// Create and Save a new User
exports.create = (req, res) => {

    // Create a User
    const food = new Food({
        name: req.body.name,
        cuisine: req.body.cuisine,
        ingredients: req.body.ingredients,
        lotNumber: req.body.lotNumber,
        costOfProduction: req.body.costOfProduction,
        sellingCost: req.body.sellingCost,
        status:true
    });

    // Save User in the database
    food
        .save(food)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Food."
            });
        });
};


// Retrieve all Foods from the database.
exports.findAll = (req, res) => {
    Food.find({ status: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving food."
            });
        });
};

// Find a single Food with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Food.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Food with id " + id });
            else if(data.status==false){
                res.status(404).send({ message: "Food record was deleted id " + id });
            }else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Food with id=" + id });
        });
};

// Update a Food by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Food.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Food with id=${id}. Maybe Food was not found!`
                });
            } else res.send({ message: "Food was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Food with id=" + id
            });
        });
};

// Update a Order Status by the id in the request
exports.deleteFood = (req, res) => {
    const id = req.params.id;
    let validData = {
        status: false
    }
    Food.findByIdAndUpdate(id, validData, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Food Status with id=${id}. Maybe Food was not found!`
                });
            } else res.send({ message: "Food Status was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Food with id=" + id
            });
        });
};