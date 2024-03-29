var express = require('express');
const req = require('express/lib/request');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const person = 'electrician';
const Appointment = require('../models/appointmentSchema')
const Service = require('../models/serviceSchema')

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
       res.redirect('/admin/plumber');
       break;

     case 'PLUMBER':
      console.log('PLUMBER');
      res.redirect('/worker/plumber');
      break;    
      
      case 'ELECTRICIAN':
        console.log('ELECTRICIAN');
        return next();
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
  Appointment.find({person:person}, (err,data)=>{
    Service.find({person:person},(err,services)=>{
      res.render('electricianDashboard', { title: 'Elektryk - Panel Wykonawcy', data,services});
    })
   
  })
     

});
router.post('/', async (req,res)=>{
  const body = req.body;
  try{
  const newService = new Service({
    person: person,
    nameOfService: body.nameOfService,
    price: body.priceOfService
  })
  newService.save();
  res.redirect(`/worker/${person}`);
}
catch(err){
console.log(err)
}
})

router.delete('/:id', async (req,res)=>{
  const id =  mongoose.Types.ObjectId(req.params);

  try{
  Service.findByIdAndDelete({'_id':id},(err,data)=>{

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

router.patch('/:id', async (req,res)=>{
  
  const id =  mongoose.Types.ObjectId(req.params);
  console.log(req.body)
    
   try{
    await Service.findByIdAndUpdate(
      {_id: req.params.id},
      {
      price: req.body.price,
      nameOfService: req.body.name
    }
      
      
      );
    
    res.status(200).send();
    await Service.save();
    
   } 
   catch(err)
   {
     console.log(err)
   } 
  
  

})
module.exports = router;
