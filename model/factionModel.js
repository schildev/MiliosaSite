const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const factionSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    members:{
        type:Array,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    typefaction:{
        type:String,
        required:true
    },
    discord:{
        type:String
    }
}, {timestamps:true});

const faction = mongoose.model("faction", factionSchema);

module.exports = faction;