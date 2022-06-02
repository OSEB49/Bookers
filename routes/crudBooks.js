var express = require('express');
const req = require('express/lib/request');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const person = 'books';
const Appointment = require('../models/appointmentSchema')

const User = require('../models/userSchema');

const passport = require('passport');

function authUser(req,res,next)
{
  const user = req.user;
   switch(user.role)
   {
     case 'USER':
       console.log('USER');
       res.redirect('/workers');
       break;

     case 'ADMIN':
       console.log('ADMIN');
       return next();
       break;

     case 'PLUMBER':
      console.log('PLUMBER');
      res.redirect('/worker/plumber');
      break;    
      
      case 'ELECTRICIAN':
        console.log('ELECTRICIAN');
        res.redirect('/worker/electrician');
        break;      
    
      case 'GARDENER':
       console.log('GARDENER');
        res.redirect('/worker/gardener');
        break;   
         
      default:
        console.log('brak sesji');
        res.redirect('/');
   }
}

/* GET home page. */
router.get('/', authUser, function(req, res, next) {
  Appointment.find({}, (err,data)=>{
    
    res.render('crudBooks', { title: 'ZAMOWIENIA CRUD', data });
  })
     

});
router.post('/admin/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.post('/', (req,res,)=>{
  const body = req.body.service;
  if(req.body.service)
  {
    res.redirect(`/admin/${body}`);
  }
})

router.delete('/:id', async (req,res)=>{
  const id =  mongoose.Types.ObjectId(req.params);
  console.log(id)
  try{
  Appointment.findByIdAndDelete({'_id':id},(err,data)=>{
    console.log(err,data);
    res.status(200).send();
  })
}
catch(err){
  console.log(err);
  res.status(500).send()
}
})
router.get('/:id', async(req,res)=>{
  const id =  mongoose.Types.ObjectId(req.params);
  try{
    await Service.find({'_id': id}, (err,data)=>{
      console.log(err,data[0].nameOfService);
      res.json({
        name: data[0].nameOfService,
        price: data[0].price
        
      })
       res.status(200).send();
      
    })
  
 
  }
  catch(err)
  {
    console.log(err)
    res.status(500).send()
  }
})

router.patch('/:id',  (req,res)=>{
 
  
  const id =  mongoose.Types.ObjectId(req.params);
  const body = req.body;
  res.status(200).send();
  

})

module.exports = router;
