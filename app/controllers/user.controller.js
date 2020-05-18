const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create and Save a new User
exports.create = (req, res) => {
    //Check email already exit or not
    User.find({ 'email': req.body.email }, function (err, user) {
        if (user.length != 0) {
            return res.status(400).send({ message: 'EMAIL already exists email: ' + user[0].email });
        }
    })

    //Password hash
    const salt = bcrypt.genSaltSync(saltRounds);

    // Create a User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        status: true,
        password: bcrypt.hashSync(req.body.password, salt),
        lastLoginAt: new Date
    });

    // Save User in the database
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    
    User.find({ status: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Tutorial with id " + id });
                else if(data.status==false){
                    res.status(404).send({ message: "User record was deleted id " + id });
                }else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id=" + id });
        });
};


// Retrieve login user from the database.
exports.login = (req, res) => {
    User.find({ email: req.body.email })
        .then(data => {
            if (data.length != 0) {
                User.find({ 'email': req.body.email }, function (err, user) {

                    let hashPassword = bcrypt.compareSync(req.body.password, user[0].password);
                    let lastLoginAt = {
                        lastLoginAt: new Date
                    }
                    if (hashPassword == true) {
                        User.findByIdAndUpdate(user[0].id, lastLoginAt, { useFindAndModify: false })
                            .then(data => {
                                res.send(data);
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Error updating User with lastLoginAt=" + id
                                });
                            });

                    } else {
                        res.status(500).send({
                            message: "Please give valid Password"
                        });
                    }
                }).catch(err => {
                    res.status(500).send({
                        message: "Could not delete Tutorial with id=" + id
                    });
                });
            } else {
                res.status(500).send({
                    message: "Please give valid Email!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

// Update a User by the id in the request
exports.updateUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    let validData = req.body
    if (req.body.password) {
        //Password hash
        const salt = bcrypt.genSaltSync(saltRounds);
        validData.password = bcrypt.hashSync(req.body.password, salt);
    }

    User.findByIdAndUpdate(id, validData, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe user was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Update a User Password by the id in the request
exports.updateUserPassword = (req, res) => {
    if (!req.body.password) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    //Password hash
    const salt = bcrypt.genSaltSync(saltRounds);
    let validData = {
        password: bcrypt.hashSync(req.body.password, salt)
    }
    User.findByIdAndUpdate(id, validData, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe user was not found!`
                });
            } else res.send({ message: "User password was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Update a User Password by the id in the request
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    let validData = {
        status: false
    }
    User.findByIdAndUpdate(id, validData, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User Status with id=${id}. Maybe user was not found!`
                });
            } else res.send({ message: "User Status was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};