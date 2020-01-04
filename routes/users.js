var express = require('express');
var router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const islog = require('../models/isAuth');
const fs = require('fs');
const fse = require('fs-extra');
const multer = require('multer');
//up load avatar
var storage = require('../middleWare/multer').storage('./temp', null, true);
var upload = require('../middleWare/multer').upload(storage).fields([{
  name: 'avatar',
  maxCount: 1
}]);

router.post('/update', islog,(req, res, next) => {
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
        deleteTemp('./temp');
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
  successRedirect: '/product/add',
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
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.redirect('/user/profile');
});

function deleteTemp(temp) {
  fse.remove(temp, err => {
      if (err) return console.error(err);
      console.log('deleted temp');
  })
}
module.exports = router;