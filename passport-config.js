const passport = require('passport');
const bcrypt = require('bcrypt');
const User =  require('./models/userSchema');
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


  

