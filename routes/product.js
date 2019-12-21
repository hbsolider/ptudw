var express = require('express');
var router = express();
const fs = require('fs');
const productManage = require('../models/product_manage')

router.get("/", function (req, res, next) {
    res.render("category", {
        title: "Products"
    });
})
router.get("/add", function (req, res, next) {
    res.render("./mProduct/add", {
        title: "Add Product"
    });
})
router.post("/add", async (req, res, next) => {
    var rs=addjson(req);
    console.log(rs);
    // var image = req.body.image||[];
    // var product = addjson(req);
    // const result = await productManage.add(product);
    // console.log(image);
    // const upload = await productManage.uploadImage(image, result.insertId);
    // var dir = './upload/' + result.insertId;
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir);
    // }

    res.redirect("/product/add");
})
router.get("/demo", function (req, res, next) {
    res.render("demo", {
        title: "demo-show"
    });
})



function addjson(req) {
    let product = req.body;
    delete product.image;
    delete product.MAX_FILE_SIZE;
    //get time current
    let today = new Date();
    var time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var timeout = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 7);
    var id_sell = req.body.id_sell || 2;
    product = {
        ...product,
        date_up: time,
        date_out: timeout,
        id_sell
    };
    return product;
}
module.exports = router;