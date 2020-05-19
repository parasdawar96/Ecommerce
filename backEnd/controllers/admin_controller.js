const mongoose = require('mongoose');
const _=require('underscore');

const Product = require('../models/product');

module.exports = {

    addProduct(req, res) {
     
        if(_.isArray(req.body)){
            let resultantArray=[];
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    let { name, discountedPrice, price, description, quantity, size, picture, discount, category, brand, gender ,color} = req.body[key];
                    let newProduct = new Product({
                        name, description, price, discountedPrice, category, size, picture, discount, quantity, brand, gender, color
                    });
                    newProduct.save();
                    resultantArray.push(newProduct);
                }
             }
             res.status(201).json(resultantArray);
        }
        else{
            let { name, discountedPrice, price, description, quantity, size, picture, discount, category, brand, gender,color } = req.body;
            let newProduct = new Product({
                name, description, price, discountedPrice, category, size, picture, discount, quantity, brand, gender,color
            });
            newProduct.save();
            res.status(201).json({newProduct}); 
        }
     
    },

    updateProduct(req, res) {
        const { id } = req.params;
        const { name, discountedPrice, price, description, quantity, size, picture, discount, category, brand, gender } = req.body;

        Product.findById({ id }).exec((err, product) => {
            if (err) console.log("product not found");

            if (name) product.name = name;
            if (description) product.description = description;
            if (quantity) product.quantity = quantity;
            if (price) product.price = price;
            if (discountedPrice) product.discountedPrice = discountedPrice;
            if (size) product.size = size;
            if (picture) product.picture = picture;
            if (brand) product.brand = brand;
            if (discount) product.discount = discount;
            if (category) product.category = category;
            if (gender) product.gender = gender;


            product.save();
            res.status(200).json({ product });
        });

    },

    deleteProduct(req, res) {
        const { id } = req.params;
        console.log("id:", id);
        Product.deleteOne({ "_id": id }).exec((err, product) => {
            if (err) console.log("product not found");
            console.log("poduct:", product);
            res.status(200).json({ product });
        })
    },

    deleteAllProduct(req, res) {
        Product.deleteMany({},(err, product) => {
            if (err) console.log("product not found");
            console.log("product:", product);
            res.status(200).json({ product });
        })
    }

   
}