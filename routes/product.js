var express = require('express');
var router = express();
const fs = require('fs');
const fse = require('fs-extra');
const passport = require('passport');
const isLog = require('../models/isAuth');
const productManage = require('../models/product_manage')
const moment = require('moment')

const gb = require('../config/globalF-V');
router.use(isLog);

//for image
let count = 1;
var multer = require('multer');
var storage = require('../middleWare/multer').storage('./temp', count, false);
var upload = require('../middleWare/multer').upload(storage).array('file', 6)
count = 1;


router.get("/search", async (req, res) => {
    const searchInput = req.query.searchInput; 
    const pSearch = await productManage.search(searchInput)
    res.render('pages/products',{
        title: searchInput,
        all: pSearch,   
        gb: (values) => gb.getDate(values)
    })
  });
router.get("/my", async (req, res) => {
    const pMy = await productManage.myproduct(req.user.id);
    res.render('pages/myproduct',{
        title: 'My Product',
        all: pMy,   
        gb: (values) => gb.getDate(values)
    })
  });
router.get("/watchlist", async (req, res) => {
    const pFav = await productManage.watchlist(req.user.id);
    res.render('pages/watchlist',{
        title: 'Watchlist',
        all: pFav,   
        gb: (values) => gb.getDate(values)
    })
  });

router.get("/", async (req, res, next) => {
    var cat = req.query.cat;
    let pAll
    if (typeof cat === "undefined") {
        pAll = await productManage.search('huawei samsung');
    } else {
        pAll = await productManage.allByCat(cat);
    }
    res.render('pages/products', {
        title: 'Products',
        all: pAll,
        gb: (values) => gb.getDate(values)
    });
})
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
        let count = 1;
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

router.get('/demo', (req, res, next) => {
    res.render('pages/vProduct', {
        title: 'demo'
    });
});


function imagesrc(req, id) {

}

function deleteTemp() {
    fse.remove('./temp', err => {
        if (err) return console.error(err);
        console.log('deleted temp');
    })
}
module.exports = router;