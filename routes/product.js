var express = require('express');
var router = express();
const fs = require('fs');
const fse = require('fs-extra');
const passport = require('passport');
const isLog = require('../models/isAuth');
const productManage = require('../models/product_manage')
const moment = require('moment')
router.use(isLog);

//for image
let count =1;
var multer = require('multer');
var storage = require('../middleWare/multer').storage('./temp',count, false);
var upload = require('../middleWare/multer').upload(storage).array('file', 6)
count =1;
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
    upload(req, res, async (err) => {
        let count =1;
        if (err instanceof multer.MulterError) {
            req.flash('error', 'Tải lên tối đa 6 ảnh');
            return res.redirect("/product/add");
        } else if (err) {
            req.flash('error', 'Lỗi không xác định');
            return res.redirect("/product/add");
        }
        if (req.files.length < 3) {
            deleteTemp();
            req.flash('error', "Tải lên tối thiểu 3 ảnh");
            return res.redirect("/product/add");
        } else if (req.files.length > 6) {
            deleteTemp();
            req.flash('error', "Tải lên tối đa 6 ảnh");
            return res.redirect("/product/add");
        } else {

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
                idSeller: req.user.id,
                imageDot: ""
            });
            const result = await productManage.add(newProduct);
            if (result.length == 0) {
                req.flash('error', 'Thêm thất bại');
                return res.redirect('/product/add');
            }
            var newDir = './public/uploads/' + `${result.insertId}`;
            fse.copy('./temp', newDir, err => {
                if (err) return console.error(err)
                else {
                    console.log('success!');
                    deleteTemp();
                }

            })
            return res.redirect("/product/add")
        }
        // Everything went fine.
    })
})

function imagesrc(req, id) {

}

function deleteTemp() {
    fse.remove('./temp', err => {
        if (err) return console.error(err);
        console.log('deleted temp');
    })
}
module.exports = router;