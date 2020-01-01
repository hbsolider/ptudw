var express = require('express');
var router = express.Router();
var mCategory = require('../models/category')
router.get('/addcate', async (req, res, next) => {
    const allCate = await mCategory.all();
    res.render('admin/addCate', {
        title: 'Admin Manager',
        category: allCate,
        message: req.flash('error')
    });
})
router.post('/addcate/add', async (req, res, next) => {
    try {
        await mCategory.refesh();
        const result = await mCategory.add(req.body.categoryname);
        res.redirect('/admin');
    } catch (err) {
        if(err.code="ER_DUP_ENTRY"){
            req.flash('error',"Nội dung bạn thêm đã có sẵn");
            res.redirect('/admin');
        }
    }

})
router.post('/addcate/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    const result = await mCategory.delete(id);
    
    res.redirect("/admin/addcate");
})
router.get('/', (req, res, next) => {
    res.redirect('/admin/addcate');
})
module.exports = router;