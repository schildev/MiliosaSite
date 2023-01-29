const Product = require("../model/shopModel");
const product = require("../model/shopModel");
const fs = require("fs");
const shop_index_get = (request, response) => {
    product.find().sort({createdAt:-1})
    .then(products => {
        return response.render("shop", {products});
    })
    .catch(err => {
        response.status(500).send(err);
    })
}

shop_create_product_get = (request, response) => {
    return response.render("createProduct", {errors:false});
}

shop_create_product_post = (request, response) => {
    const product = new Product(Object.assign({}, request.body, {image:request.file.path}));
    product.save()
    .then(product => {
        return response.redirect("/shop/");
    })
    .catch(err => {
        fs.unlink(request.file.path, (err) => {
            if(err) return response.write("Le fichier n'a pas pu être supprimer !");
            return response.render("createProduct", {errors:err})
        })
    })
}

module.exports = {
    shop_index_get,
    shop_create_product_get,
    shop_create_product_post
}