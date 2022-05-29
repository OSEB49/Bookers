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
    if(req.body.confirmReg)
    {
      try{
    const addUsers = new User({
      name: body.name,
      email: body.email,
      password: hashedPassword
    })
    addUsers.save();
    res.redirect('/workers')
  }

  catch(err)
  {
   console.log(err);
  }
}
next();
})


router.post('/login', passport.authenticate('local',{
  successRedirect: '/workers',
  failureRedirect: '/',
  successFlash: ''

}), (req,res,next)=>{
  console.log(res);
})






module.exports = router;
