var express = require('express');
var router = express();
const fs = require('fs');
const passport = require('passport');
const isLog = require('../models/isAuth');
const productManage = require('../models/product_manage')
const moment = require('moment')
router.use(isLog);
let count = 1;
//for image
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = './temp';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, './temp')
    },

    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, `${count++}` + '.' + extension)
    }
})
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            req.flash('error', "Chỉ cho phép định dạng hình ảnh");
            return cb(null, false, new Error("false"));
        }
    }
}).array('file', 6)



router.get("/", function (req, res, next) {
    res.render('pages/products', {
        title: 'Products'
    });
})
router.get('/demo', (req, res, next) => {
    res.render('pages/vProduct', {
        title: 'demo'
    });
});
//các thao tác liên quan đến sản phẩm
//thêm sản phẩm
router.get("/add", function (req, res, next) {
    res.render("./mProduct/add", {
        title: "Add Product",
        message: req.flash('error')
    });
})
router.post("/add", (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            req.flash('error', "Upload ảnh tối đa 6 ảnh");
            return res.redirect('/product/add');
        }
        next()
    })

}, async (req, res, next) => {
    count = 1;
    delete req.body['MAX_FILE_SIZE'];
    var curr = moment(Date.now()).format('YYYY-MM-DD hh:mm:ss');
    var newProduct = [];
    newProduct.push({
        nameProduct: req.body.nameProduct,
        category: req.body.category,
        priceStart: req.body.priceStart,
        priceExpect: req.body.priceExpect,
        transpotMethod: req.body.transpotMethod,
        detail: req.body.detail,
        dateUp: curr,
        timeExist: 7,
        idSeller: req.user.id
    });
    try {
        const result = await productManage.add(newProduct);
        var newDir = './upload/' + `${result.insertId}`;
        fs.rename('./temp', newDir, function (err) {
            if (err) return res.send(err);
        })
        res.redirect("/product/add")
    } catch (err) {
        var newDir = './upload/' + `${result.insertId}`;
        if (fs.existsSync(newDir)) {
            fs.rmdir('newDir')
        }
        fs.rmdir('./temp')
        res.send(err);
    }

})
module.exports = router;