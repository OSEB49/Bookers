var express = require('express');
var router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
passport.initialize();
passport.session();
passport.serializeUser(function(user,done){
  done(null,user.id)
})
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
      done(err,user);
    })
})
passport.use(new localStrategy(function(username, password, done){
  User.findOne({'email':username},(err,user)=>{
    if(err) return done(err)
    if(!user) return done(null, false, {message: 'Nieznaleziono uzytkownika'});
    
    bcrypt.compare(password, user.password, function(err,res){
      if(err) return done(err);
      if(res===false) return done(null, false, {message: 'Niepoprawne Haslo'});
      
      console.log(user);
      return done(null, user);
    });
  });
}));


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  console.log(req.user);;
  res.redirect('/workers');
}

function isLoggedOut(req,res,next){
  if(!req.isAuthenticated()) return next();
  console.log(req.user);;
  res.redirect('/');
}
router.get('/', isLoggedIn, (req,res)=>{
  console.log(req,res);
  next();
})

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
    res.render('index', { title: 'Express' });
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});



router.post('/', passport.authenticate('local',{
  successRedirect: '/workers',
  failureRedirect: '/',
  successFlash: ''

}))


router.post('/', async (req,res)=>{
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.regPassword, 10);
    try{
    const addUsers = new User({
      name: body.name,
      username: body.email,
      password: hashedPassword
    })
    addUsers.save();
    res.redirect('/workers')
  }
  catch(err)
  {
   console.log(err);
  }
})
module.exports = router;
