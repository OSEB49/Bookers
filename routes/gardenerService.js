
var express = require('express');
var router = express.Router();
const Service = require('../models/serviceSchema.js');
const mongoose = require('mongoose');
const Appointment = require('../models/appointmentSchema');
const person = 'gardener';

function isSession(req,res,next)

{
  const user = req.user;
 
  if(user){
    console.log('sessions is active', req.user)
    return next()
  }
  else{
    console.log('session is failed')
    res.redirect('/')
  }
}
/* GET home page. */
router.get('/', isSession, function(req, res, next) {
  Service.find({'person':person}, (err,data)=>{
    res.render('gardenerService', { title: 'Ogrodnik', data });
  })
  
});


router.post('/', async (req,res)=>{
  const body = req.body;
  //const id = mongoose.Types.ObjectId(body.service);
  const checkboxLength = body.service.length;
  const id = body.service
  const user = req.user;
  try{
   for(i=0; i<=body.service.length; i++)
    { 
      console.log(id[i])
      Service.findOne({_id: id[i]}, (err,data)=>{
      console.log(data);
      const newBook =  new Appointment({
        person: person,
        username: user.name || body.name,
        nameService: data.nameOfService,
        email: user.email || body.email,
        address: body.address,
        date: body.date,
        price: data.price,
        info: body.information
      })
      newBook.save();
      
      })
      
      res.redirect(`/${person}`)
    }
    
  }
  catch(err)
  {
    console.log(err);
  }
  })
  
module.exports = router;
