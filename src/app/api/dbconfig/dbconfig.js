const mongoose = require('mongoose')

export default async function dbConnect(){
    await mongoose.connect("mongodb+srv://ajink3994:ajinkya2022@cluster0.mnc5ejc.mongodb.net/"),{
    useNewUrlParser:true,
    useUnifiedTopology:true
}}