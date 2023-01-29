
const jwt = require("jsonwebtoken");
const { User } = require("./model/authModel");
const faction = require("./model/factionModel");

const requireAdminAuth = (request, response, next) => {
    const jwtToken = request.cookies.jwt;
    if(jwtToken){
        jwt.verify(jwtToken, process.env.SECRET_KEY, async (err, decodedToken) => {
            if(err){
                response.redirect("/auth/login");
            }
            else{
                let loggedUser = await User.findById(decodedToken.id);
                if(loggedUser.isAdmin){
                    next();
                }else response.redirect("/");
                
            }
        });
    }
    else{
        response.redirect("/auth/login");
    }
}
const requireFactionAuth = (request, response, next) => {
    const jwtToken = request.cookies.jwt;
    if(jwtToken){
        jwt.verify(jwtToken, process.env.SECRET_KEY, async (err, decodedToken) => {
            if(err){
                response.redirect("/auth/login");
            }
            else{
                let loggedUser = await User.findById(decodedToken.id);
                if(loggedUser && loggedUser.isFactionLeader){
                    next();
                }
                else response.redirect("/");
            }
        });
}else response.redirect("/auth/login")
}
const checkUser = (request, response, next) => {
    const token = request.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if(err){
                response.locals.userlog = null;
                next();
            }
            else{
                let loggedUser = await User.findById(decodedToken.id);
                let factionUser = await faction.findOne({members:loggedUser.username});
                response.locals.userlog = loggedUser;
                response.locals.locfaction = factionUser;
                next();
            }
        });
    }
    else{
        response.locals.userlog = null;        
        response.locals.locfaction = null;
        next();
    }
}
module.exports = {requireAdminAuth, checkUser, requireFactionAuth};
