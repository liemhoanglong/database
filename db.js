//1.require mongoose
const mongoose = require('mongoose')
//2.connect
mongoose.connect('mongodb://localhost/myDatabase')
//3.tạo Schema
const productsSchema = new mongoose.Schema({
    name: String,
    amount: Number
})
const usersSchema = new mongoose.Schema({
    name: String,
    password: String
})
//4.tạo model
const products = mongoose.model('products',productsSchema)

//5.CRUD
products.create({
    name: "Nhà giả kim",
    amount: 20
})