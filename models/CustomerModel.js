const mongoose = require("mongoose")
const Schema = mongoose.Schema


const customerSchema = new Schema({
    customerName: String,
    customerPhone: String,
    customerID: Number,
    customerEmail: String,
    dateAdded: Date,
    waiting: Boolean
})

let Customer = mongoose.model("Customer", customerSchema)


module.exports = Customer