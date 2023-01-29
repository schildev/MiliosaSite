const user = require("../model/authModel");
const jwt = require("jsonwebtoken");
const faction = require("../model/factionModel");

const handleErrors = (err) => {
    let errors = {email:"", password:""}
    if(errors.code === 11000) errors.email = "Cet email est déjà utiliser !"
    if(err.message.includes("user validation failed:")){
        Object.values(err.errors).forEach((properties) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}
const maxAge = 86400;
const createToken = (id) => {
    return jwt.sign({ id }, 'jesus christ super mega nigga lmao u too nigg bro', {
        expiresIn: maxAge
      });
}

const signup_get = (request, response) => {
    response.render("signup");
}

const signup_post = async (request, response) => {
    const {username, discord, password1, password2} = request.body;
    if(password1 != password2){
        response.status(401).send("Les deux mots de passes ne sont pas les même !");
    }
    try{
        const userconst = await user.User.create({username, discord:discord, password:password1});
        const token = createToken(userconst._id);
        response.cookie("jwt", token, {maxAge:maxAge*1000, httpOnly:true});
        response.redirect("/");
    }
    catch(errors){
        let err = handleErrors(errors);
        response.status(400).send(err);
    }
}

const login_get = (request, response) => {
    response.render("login");
}

const login_post = async (request, response) => {
    const {username, password} = request.body;
    const userlog = await user.User.login(username, password);
    if(userlog === null){
        response.status("400").send("Email ou le mot de passe est incorrect.");
        return null;
    }
    const token = createToken(userlog._id);
    response.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    response.status(201).send("You are now logged !");
}
const logout = (request, response) => {
    const userLogged = request.cookies.jwt;
    if(userLogged){
        response.cookie("jwt", "", {maxAge:1});
    }
    response.redirect("/");
}
const userInfo = (request, response) => {
    const username = request.params.username;
    user.User.findOne({username})
    .then(userInfo => {
        faction.findOne({members:username})
        .then(facUser => {
            response.render("userInfo", {user:userInfo, faction:facUser});
        })
        .catch(err => {
            response.render("userInfo", {user:userInfo, faction:null})
        })
        
    })
};

module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post,
    logout,
    userInfo
}
