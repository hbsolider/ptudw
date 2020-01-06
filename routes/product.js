var express = require('express');
var router = express();
const fs = require('fs');
const fse = require('fs-extra');
const passport = require('passport');
const isLog = require('../models/isAuth');

const productManage = require('../models/product_manage')
const User = require('../models/User')
const Category = require('../models/category')
const moment = require('moment')
const config = require('../config/default.json')
const gb = require('../config/globalF-V');
const mail = require('../middleWare/mail');
//for image
let count = 1;
var multer = require('multer');
var storage = require('../middleWare/multer').storage('./temp', count, false);
var upload = require('../middleWare/multer').upload(storage).array('file', 6)

router.get("/myproduct", async (req, res) => {
    const pMy = await productManage.myproduct(req.user.id);
    res.render('pages/myproduct', {
        title: 'My Product',
        all: pMy,
        gb: (values) => gb.getDate(values)
    })
});

router.get("/", async (req, res, next) => {
    var jsonGet = {};
    jsonGet = req.query;
    const urlParams = req.query;
    var cat = req.query.cat;
    var searchInput = req.query.searchInput;
    var page = req.query.page || 1;
    const limit = config.paginate.limit;
    const page_numbers = [];
    if (page < 1) page = 1;
    const offset = (page - 1) * limit;
    var sql = "select * from product";
    
    
    if (typeof cat != 'undefined') {
        sql += ` where category = ${cat}`;
       
    } else if (typeof searchInput != 'undefined') {
        sql += ` where nameProduct like ('%${searchInput}%')`;
        
    }
    console.log(sql);
    for (const key in jsonGet) {
        if (key === "endDate" && jsonGet[key] === "true") {
          sql += " ORDER BY timeExist DESC";
        } else if (key === "priceASC" && jsonGet[key] === "true") {
          sql += " ORDER BY priceStart ASC";
        } else if (key === "priceASC" && jsonGet[key] === "false") {
          sql += " ORDER BY priceStart DESC";
        }
      }
    sql += ` limit ${config.paginate.limit} offset ${offset}`
    console.log(sql);
    let [total, rows] = await Promise.all([
        productManage.count(),
        productManage.pageBySort(sql)
    ])
    
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    for (i = 1; i <= nPages; i++) {
       
        urlParams.page = i;
        let query = "?";
        for (let key in urlParams) {
            query += key + "=" + urlParams[key] +"&";
        }
        query = query.slice(0,-1);
        page_numbers.push({
            value: query,
            isCurrentPage: i === +page
        })
    }
    // 
    // for (i = 1; i <= nPages; i++) {
    //     page_numbers.push({
    //         value: i,
    //         isCurrentPage: i === +page
    //     })
    // }
    pAll = rows;
    res.render('pages/products', {
        title: 'Products',
        all: rows,
        gb: (values) => gb.getDate(values),
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,
    });
})
router.get("/id=:id", async (req, res, next) => {
    var id = req.params.id;
    if (id === "add") return next()
    const product = await productManage.productbyId(id);
    const rows = await productManage.namebidCurrent(id);
    let name
    if (rows.length != 0) {
        var tmp = rows[0].username;
        for(i =0 ;i <tmp.length/2-1;i++){
            tmp = tmp.replace(tmp[i],'*');
        }
        name = tmp
    } else {
        name = null
    }
    console.log(name)
    res.render('pages/vProduct', {
        title: product.nameProduct,
        empty: product.length === 1,
        product: product[0],
        namebidCurrent: name
    });
})
//các thao tác liên quan đến sản phẩm
//thêm sản phẩm
router.get("/add", isLog, async (req, res, next) => {
    const cate = await Category.all();
    res.render("./mProduct/add", {
        title: "Add Product",
        message: req.flash('error'),
        cate: cate
    });
})
router.post("/add", isLog, (req, res, next) => {
    upload(req, res, async (err) => {
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
            console.log("restart")
            count = 1
            delete req.body['MAX_FILE_SIZE'];
            var curr = moment(Date.now()).format('YYYY-MM-DD hh:mm:ss');
            var newProduct = [];
            newProduct.push({
                nameProduct: req.body.nameProduct,
                category: req.body.category,
                priceStart: parseInt(req.body.priceStart),
                priceExpect: parseInt(req.body.priceExpect) || null,
                transpotMethod: req.body.transpotMethod,
                detail: req.body.detail,
                dateUp: curr,
                timeExist: 7,
                idSeller: req.user.id,
                imageDot: req.files.length,
                status: 0
            });

            const result = await productManage.add(newProduct);
            if (result.length == 0) {
                req.flash('error', 'Thêm thất bại');
                return res.redirect('/product/add');
            } else {
                req.files.forEach(async (e) => {
                    var image = {
                        filename: e.filename,
                        idproduct: 1
                    };
                    const result = await productManage.addimage(image);
                })
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


router.post('/bid', async (req, res, next) => {
    if (!req.user) return res.json({
        check: false
    })
    const product = await productManage.productbyId(req.body.id);
    if (product[0].idSeller === req.user.id) return res.json({
        isSeller: true
    });
    const ranking = await User.ranking(req.user.id);
    if (ranking[0].ranking < 8) return res.json({
        ranking: false
    });
    return res.json({
        confirm: true,
        nowprice: product[0].nowprice
    })
})
//xác nhận đáu giá và thêm thông báo cho seller 
router.post('/confirmbid', async (req, res, next) => {
    price = parseInt(req.body.price)
    now = moment(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    entity = {
        idbidder: req.user.id,
        idproduct: req.body.id,
        price: price,
        time: now
    }
    await productManage.updateBid(entity)
    rows = await User.findbyID(req.user.id);
    notifi={
        idseller:req.body.idseller,
        idbidder: req.user.id,
        idproduct: req.body.id,
        status: 0
    }
    await User.addnotify(notifi);
    mail.bidderAnnouce(rows[0].email,req.body.nameproduct,price);
    return res.json({
        success: true
    });
})
// Thêm vào danh sách ưa thích
router.post('/addtolist', async (req, res, next) => {
    if (typeof req.user === 'undefined') {
        return res.send({
            nonuser: true
        })
    } else {
        const list = await User.getmylist(req.user.id);
        var idproduct = req.body.idproduct;
        check = await productManage.productbyId(idproduct);
        if(check[0].idSeller===req.user.id) return res.json({isowner: true});
        if (list.length != 0) {
            for (i = 0; i < list.length; i++) {
                if(list[i].idproduct===parseInt(req.body.idproduct)){
                    return res.send({inlist: true})
                }
            }
            listitem = {
                idproduct: req.body.idproduct,
                iduser: req.user.id
            }
            const result = await productManage.addtolist(listitem);
            return res.send({
                result
            })
        } else {
            listitem = {
                idproduct: req.body.idproduct,
                iduser: req.user.id
            }
            const result = await productManage.addtolist(listitem);
            return res.send({
                result
            })
        }

    }

})

function deleteTemp() {
    fse.remove('./temp', err => {
        if (err) return console.error(err);
        console.log('deleted temp');
    })
}
module.exports = router;