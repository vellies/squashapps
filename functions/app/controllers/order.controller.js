const db = require("../models");
const Order = db.orders;

// Create and Save a new Order
exports.create = (req, res) => {

    // Create a Order
    const order = new Order({
        orderNum: req.body.orderNum,
        status: req.body.status,
        orderDate: req.body.orderDate,
        dateOfdelivery: req.body.dateOfdelivery,
        modeOfTransport: req.body.modeOfTransport
    });
    // Save Order in the database
    order
        .save(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Order."
            });
        });
};


// Retrieve all Order from the database.
exports.findAll = (req, res) => {
        Order.find({ status: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Order."
            });
        });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Order with id " + id });
                else if(data.status==false){
                    res.status(404).send({ message: "Order record was deleted id " + id });
                }else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Order with id=" + id });
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

    Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Order with id=${id}. Maybe Order was not found!`
                });
            } else res.send({ message: "Order was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
};

// Update a Order Status by the id in the request
exports.deleteOrder = (req, res) => {
    const id = req.params.id;
    let validData = {
        status: false
    }
    Order.findByIdAndUpdate(id, validData, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Order Status with id=${id}. Maybe Order was not found!`
                });
            } else res.send({ message: "Order Status was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
};