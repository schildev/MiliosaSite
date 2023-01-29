const express = require("express");

const mongoose = require("mongoose");
const app = express();
const dbLogin = null;
const baseController = require("./controllers/controller");
const ruleRouter = require("./router/ruleRouter");
const shopRouter = require("./router/shopRouter");
const factionRouter = require("./router/factionRouter");
const authRouter = require("./router/authRoute");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./authMiddleware");

app.set("view engine", "ejs");
app.set("views", "templates");
app.use(express.static("static"));
app.use("/media", express.static("media"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
mongoose.connect(dbLogin, {useNewUrlParser:true, useUnifiedTopology:true})
.then(result => app.listen(8000))
.catch(err => console.log(err));
app.get("*", checkUser);

app.get("/", baseController.index_control);

app.get("/status", (request, response) => {
    response.status(200).send("OK");
})

app.use("/rules", ruleRouter);

app.use("/shop", shopRouter);

app.use("/factions", factionRouter);

app.use("/auth", authRouter);
