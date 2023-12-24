const mongoose = require('mongoose')

const User = new mongoose.Schema({
    title:String,
    description:String
})

mongoose.models = {}
module.exports = mongoose.model("NewUser",User)