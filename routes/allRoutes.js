const path = require("path");
const data = require("../data/tableData")
const mongoose = require('mongoose');
let Customer = require("../models/CustomerModel")

function htmlRoutes(app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"))
    })

    app.get("/reserve", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/reserve.html"))
    })

    app.get("/tables", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tables.html"))
    })
}

function apiRoutes(app) {

    app.get("/api/tables", function (req, res) {
        Customer.find({waiting: false}, function (err, customerData) {
            if (!err) {
                res.send(customerData)
            } else {
                console.log(err)
                res.send({status: 300})
            }

        })
    });

    app.get("/api/waitlist", function (req, res) {
        Customer.find({waiting: true}, function (err, customerData) {
            if (!err) {
                res.send(customerData)
            } else {
                console.log(err)
                res.send({status: 300})
            }

        })
    })

    app.post("/api/clear", function (req, res) {
        Customer.deleteMany({}, function(err){
            if (!err){
                console.log("Data cleared")
                res.json({ok: true})
            } else {
                console.log(err)
            }
        })
   
    })

    app.post("/api/tables", function (req, res) {

        let customer = new Customer({
            customerName: req.body.customerName,
            customerPhone: req.body.customerPhone,
            customerID: req.body.customerID,
            customerEmail: req.body.customerEmail,
            waiting: false,
            dateAdded: new Date()
        });

        Customer.countDocuments({}, function (err, count) {
            console.log("Count: " + count)
            if (count > 5) {
                customer.waiting = true;
            }
            customer.save(function (err) {
                if (err){
                    console.log(err)
                } else {
                console.log("Customer info: " + customer)
                res.json(true)
                }
            });
        });
    });
}

module.exports = { htmlRoutes, apiRoutes } 