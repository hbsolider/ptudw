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
//up load avatar
var storage = require('../middleWare/multer').storage('./temp', null, true);
var upload = require('../middleWare/multer').upload(storage).fields([{
  name: 'avatar',
  maxCount: 1
}]);

router.post('/updateavatar', islog, (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log("Loi upload");
      return;
    } else if (err) {
      console.log("have problem");
      return;
    }
    var newDir = './public/avatar/' + `${req.user.id}`;
    fse.copy('./temp', newDir, err => {
      if (err) return console.error(err)
      else {
        console.log('success!');
        //deleteTemp('./temp');
      }

    })
    return res.redirect('/user/profile')
  })
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

module.exports = router;