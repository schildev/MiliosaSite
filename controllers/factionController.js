const faction = require("../model/factionModel");
const fs = require("fs");
const { User } = require("../model/authModel");
const factions_index_get = (request, response) => {
    faction.find()
    .then(data => {
        return response.render("factions", {factions:data, titlePage:"Toutes les factions"})
    })
    .catch(err => {
        return response.status(500).send(err);
    })
}
const factions_create_get = (request, response) => {
    User.find().then(data => {
        return response.render("createFaction", {errors:false, users:data, titlePage:"Créer une faction"});
    })
}

const factions_create_post = (request, response) => {
    const factionCreate = new faction(Object.assign({}, request.body, {image:request.file.path}))
    factionCreate.save()
    .then(result => {
        return response.redirect("/factions");
    })
    .catch(err => {
        if(request.file != null){
            fs.unlink(request.file.path, (err) => {
                if(err) return response.write("Le fichier n'a pas pu être supprimer !");
                return response.render("createFaction", {errors:err});
            })
        }
    })
}

const faction_info_get = (request, response) => {
    const factionID = request.params.id;
    faction.findById(factionID)
    .then(faction => {
        response.render("factionInfo", {faction:faction, titlePage:`Information sur la faction ${faction.name}`});
    })
    .catch(err => {
        response.redirect("/factions");
    })
}

const faction_modificate_get = (request, response) => {
    const factionID = request.params.id;
    faction.findById(factionID)
    .then(factiongeted => {
        const loggedUser = response.locals.userlog;
        if(factiongeted.members.includes(loggedUser.username)){
            response.render("modificateFaction", {faction:factiongeted, titlePage:"Modifier votre faction"});
        }else response.redirect("/factions/");
    })
    .catch(err => {
        response.redirect("/auth/login");
    })
}
const faction_modificate_post = (request, response) => {
    const factionID = request.params.id;
    faction.findById(factionID)
    .then(factiongeted => {
        if(response.locals.locfaction._id.toString() == factiongeted._id.toString()){
            const firstImage = factiongeted.image;
            let image;
            if(request.file)image = request.file.path;
            else image = firstImage;
            factiongeted.overwrite(Object.assign({}, request.body, {members:factiongeted.members}, {image:image}));
            factiongeted.save()
            .then(result => {
                if(request.file != null && firstImage != null){
                    fs.unlink(firstImage, (err) => {
                        if(!err) console.log("fichier supprimer");
                    })
                }
                response.redirect("/factions/faction/" + factiongeted._id);
            })
            .catch(err => {
                if(request.file){
                    fs.unlink(request.file.path, (err) => {
                        if(!err) console.log("fichier supprimer");
                    })
                }
                console.log(err);
                response.status(400).send("Il y a eu une erreur lors de la modification !");
            })
        }else response.redirect("/factions/");
    })
    .catch(err => {
        console.log(err);
        if(request.file != null){
            fs.unlink(request.file.path, (err) => {
                if(err) return response.write("Le fichier n'a pas pu être supprimer !");
                return response.render("createFaction", {errors:err});
            })
        }
        response.redirect("/factions/");
    })
}

const faction_members_change_get = (request, response) => {
    const factionID = request.params.id;
    const users = User.find().then(users => {
        faction.findById(factionID)
        .then(factionGetted => {
            response.render("changeFactionMembers", {faction:factionGetted, users, titlePage:`Changer les membres de la faction ${factionGetted.name}`});
        })
        .catch(err => {response.status(404).send("Faction non trouvé !");console.log(err);});
        })
}
const faction_members_change_post = (request, response) => {
    const factionID = request.params.id;
    faction.findById(factionID)
    .then(factionGetted => {
        let members;
        members = request.body.members;
        if(!request.body.members)members = "null";
        factionGetted.members = members;
        factionGetted.save()
        .then(succ => {
            response.redirect("/factions/faction/" + factionID);
        })
        .catch(err => response.status(500).send(err))
    })
}
module.exports = {
    factions_index_get,
    factions_create_get,
    factions_create_post,
    faction_info_get,
    faction_modificate_get,
    faction_modificate_post,
    faction_members_change_get,
    faction_members_change_post
}
