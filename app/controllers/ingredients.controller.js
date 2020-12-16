const db = require("../models");
const Ingredient = db.ingredients;

// Create and Save a new User
exports.create = (req, res) => {

    // Create a User
    const ingredient = new Ingredient({
        name: req.body.name,
        lotNumber: req.body.lotNumber,
        availableQuantity: req.body.availableQuantity,
        thresholdQuantity: req.body.thresholdQuantity,
        price: req.body.price,
        vendorName: req.body.vendorName,
        vendorEmail: req.body.vendorEmail,
        status:true
    });

    // Save User in the database
    ingredient
        .save(ingredient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Ingredient."
            });
        });
};


// Retrieve all Foods from the database.
exports.findAll = (req, res) => {

    Ingredient.find({ status: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Ingredient."
            });
        });
};

// Find a single Food with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Ingredient.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Ingredient with id " + id });
                else if(data.status==false){
                    res.status(404).send({ message: "Ingredient record was deleted id " + id });
                }else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Ingredient with id=" + id });
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

    Ingredient.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Ingredient with id=${id}. Maybe Ingredient was not found!`
                });
            } else res.send({ message: "Ingredient was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ingredient with id=" + id
            });
        });
};

// Update a Order Status by the id in the request
exports.deleteIngredients = (req, res) => {
    const id = req.params.id;
    let validData = {
        status: false
    }
    Ingredient.findByIdAndUpdate(id, validData, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Ingredient Status with id=${id}. Maybe Ingredient was not found!`
                });
            } else res.send({ message: "Ingredient Status was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ingredient with id=" + id
            });
        });
};