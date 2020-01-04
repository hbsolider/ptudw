var express = require('express');
var router = express.Router();
const isLog = require('../models/isAuth');
var isAdmin = require('../middleWare/isAdmin');
//db
const User = require('../models/User');
var mCategory = require('../models/category');

router.use(isLog);
router.use(isAdmin);
router.get('/category', async (req, res, next) => {
    const allCate = await mCategory.all();
    res.render('admin/category', {
        title: 'Admin Manager',
        category: allCate,
        message: req.flash('error')
    });
})
//user
router.get('/admin/user',async(req,res,next)=>{
    var users = await User.all();
    res.render('')
})
//Category
router.post('/category/add', async (req, res, next) => {
    try {
        const result = await mCategory.add(req.body.categoryname);
        res.redirect('/admin');
    } catch (err) {
        if(err.code="ER_DUP_ENTRY"){
            req.flash('error',"Nội dung bạn thêm đã có sẵn");
            res.redirect('/admin');
        }
    }

})
router.post('/category/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    const result = await mCategory.delete(id);
    await mCategory.refesh();
    res.redirect("/admin/category");
})
router.get('/', (req, res, next) => {
    res.redirect('/admin/category');
})
module.exports = router;