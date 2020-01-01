var express = require('express');
var router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const islog = require('../models/isAuth');
// user method
router.get('/signin', function (req, res, next) {
  if(req.user){
    res.redirect('/');
  }
  else{
    res.render('user/signin', {
      title: 'Sign in',
      message: req.flash('error')
    });
  }
  
})
router.get('/signup', (req, res, next) => {
  if(req.user){
    res.redirect('/');
  }
  else{
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
router.get('/profile',islog,(req,res,next)=>{
  res.render('user/profile',({
    title:"Profile",
    profile:req.session.profile
  }));
})
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/user/signup',
  failureFlash: true
}));
router.get('/logout',(req,res,next)=>{
  req.logOut();
  res.redirect('/');
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/user/profile');
});
module.exports = router;
