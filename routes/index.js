var express = require('express');
var router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.post('/register', async (req,res,next)=>{
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.regPassword, 10);
      try{
    const addUsers = new User({
      name: body.name,
      email: body.email,
      password: hashedPassword
    })
    addUsers.save();
    console.log('work')
    res.redirect('/workers')
  }

  catch(err)
  {
   console.log(err);
  }

})


router.post('/login', passport.authenticate('local',{
  failureRedirect: '/',
  successFlash: ''

}), (req,res,next)=>{
  console.log(req.user.role)
  console.log('dziala')
  if(req.user.role==='USER'){
    res.redirect('/workers')
  }
  
  else if( req.user.role==='PLUMBER'){
    res.redirect('/worker/plumber')
    
  }
  else if(req.user.role==='ADMIN'){
    res.redirect('/admin/plumber')
  }
  else if(req.user.role==='ELECTRICIAN'){
    res.redirect('/worker/electrician')
  }
  else if(req.user.role==='GARDENER'){
    res.redirect('/worker/gardener')
  }
})

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});








module.exports = router;
