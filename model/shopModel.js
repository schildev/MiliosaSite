const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    productType:{
        type:String,
        enum: ['kits', 'In-Game', "Création Serveur", "Autres"],
        default: 'kits',
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

const Product = mongoose.model("product", productSchema);

module.exports = Product;