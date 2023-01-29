
const Rule = require("../model/ruleModel");
const index_control = (request, response) => {
    Rule.find()
    .then(data => {
        return response.render("base", {rules:data});
    })
    .catch(err => console.log(err));
}
const show_rules_get = (request, response) => {
    Rule.find()
    .then(data => {
        return response.send(data)
    })
    .catch(err => {
        return response.send(err);
    })
}

const create_rules_get = (request, response) => {
    return response.render("createRule", {errors:false});
}

const create_rules_post = (request, response) => {
    const rule = new Rule(request.body);
    rule.save()
    .then(result => {
        return response.redirect("/rules");
    })
    .catch(err => {
        return response.status(400).render('createRule', { errors:err });
    })
}

module.exports = {
    index_control,
    show_rules_get,
    create_rules_get,
    create_rules_post
}