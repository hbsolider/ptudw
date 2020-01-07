var express = require('express');
var router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const islog = require('../models/isAuth');
const fs = require('fs');
const fse = require('fs-extra');
const multer = require('multer');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const mail = require('../middleWare/mail');
//up load avatar
var storage = require('../middleWare/multer').storage('./temp', null, true);
var upload = require('../middleWare/multer').upload(storage).single('avatar')
router.get('/',(req,res,next)=>{
  res.redirect("/user/profile");
})
router.post('/updateprofile',upload,async(req, res, next) => {
    resutl = await User.updateProfile(req.body,req.user.id)
    row = await User.findbyID(req.user.id)
    req.session.profile.username= row[0].username;
    req.session.profile.userphone= row[0].userphone;
    res.redirect('/user/profile');
})
// user method
router.get('/signin', function (req, res, next) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('user/signin', {
      title: 'Sign in',
      message: req.flash('error')
    });
  }
})
router.get('/signup', (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('user/signup', {
      title: 'Sign up',
      message: req.flash('error')
    });
  }
})

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/product',
  failureRedirect: '/user/signin',
  failureFlash: true
}))
router.get('/profile', islog, (req, res, next) => {
  res.render('user/profile', ({
    title: "Profile",
    profile: req.session.profile
  }));
})
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/user/signup',
  failureFlash: true
}));
router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/');
})
router.post('/clone', async (req, res, next) => {
  var password = faker.internet.password();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  var user = {
    email: faker.internet.email(),
    password: password,
    username: faker.name.findName(),
    permission: Math.floor(Math.random() * 2),
    ranking: Math.floor(Math.random() * 11),
    userphone: faker.phone.phoneNumber()
  }
  var result = await User.add(user);
  res.redirect('/admin/alluser');
})
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.redirect('/user/profile');
});

//create notify
router.post('/updateseller', async (req, res, next) => {
  var result = await User.updatePer(req.body);
  res.send(result);
})
router.get('/getmylist', async (req, res, next) => {
  if(typeof req.user =="undefined") {
    return res.send({nonuser: true});
  }
  else{
    result = await User.loadmylist(req.user.id);
    req.session.list =result;
    return res.send({
      length: result.length,
      empty: result.length === 0,
    });
  }
})
router.post('/deleteitem',async(req,res,next)=>{
  entity={
    idproduct: req.body.id,
    iduser: req.user.id
  }
  console.log(entity)
  result = await User.cleariteminmylist(req.body.id,req.user.id);
  
  res.send({check:true});
})
router.get('/notification',async(req,res,next)=>{
  let noti;
  noti = await User.getStoB(req.user.id)
  if(req.user.permission == 1 || req.user.permission == 2){
    notiS = await User.getBtoS(req.user.id);
    return res.send({noti,notiS,check: true});
  }else{
    return res.send({noti,check: false})
  }
})
router.post('/accept',async(req,res,next)=>{
    mail.acceptBidder(req.body.email,req.body.nameProduct);
    //update status trong notify
    const result=await User.updateNoti(req.body.id,req.user.id,1);
    res.send({success: true})
})
router.post('/deny',async(req,res,next)=>{
  mail.denyBidder(req.body.email,req.body.nameProduct);
  entity= {
    idbidder: parseInt(req.body.id),
    idseller: req.user.id,
    idproduct: parseInt(req.body.idproduct)
  }
  console.log(entity)
  await User.adddeny(entity);
  //update status trong notify
  const result=await User.updateNoti(req.body.id,req.user.id,2);
  res.send({success: true})
})
module.exports = router;