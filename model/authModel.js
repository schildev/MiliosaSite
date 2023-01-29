const mongoose = require("mongoose");
const {isEmail} = require("validator");
const Schema = mongoose.Schema;
const argon = require("argon2");

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:[14, "Un mot de passe de + de 14 caractères est requis."]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isFactionLeader:{
        type:Boolean,
        default:false
    },
    discord:{
        type:String
    }
});

userSchema.pre("save", async function(next){
    this.password = await argon.hash(this.password); 
    next();
})

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if(!user)return null;
    let isCorrectPass = await argon.verify(user.password, password);
    if(isCorrectPass){
        return user;
    }
    else{
        return null;
    }
}

const User = mongoose.model("user", userSchema);

// const factionUserSchema = new Schema({
//     username:{
//         type:String,
//         required:true,
//     },
//     password:{
//         type:String,
//         required:true,
//         minLength:10
//     },
//     isLeader:{
//         type:Boolean,
//         default:false
//     }
// }, {timestamps:true})

// factionUserSchema.pre("save", async function(next){
//     this.password = await argon.hash(this.password); 
//     next();
// })
// factionUserSchema.statics.login = async function(email, password){
//     const userLogged = await this.findOne({email});
//     if(!userLogged){return null;}
//     const goodPass = await argon.verify(userLogged.password, password);
//     if(goodPass){
//         return userLogged;
//     }else{
//         return null;
//     }
// }

//const FactionUser = mongoose.model("factionUser", factionUserSchema);

module.exports = {User};