var express = require('express');
const req = require('express/lib/request');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const person = 'plumber';
const Appointment = require('../models/appointmentSchema')
const Service = require('../models/serviceSchema')

/* GET home page. */
router.get('/', function(req, res, next) {
  Appointment.find({person:person}, (err,data)=>{
    Service.find({person:person},(err,services)=>{
      res.render('plumberDashboard', { title: 'Hydraulik - Panel Wykonawcy', data,services});
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
  console.log(id)
  try{
  Service.findByIdAndDelete({'_id':id},(err,data)=>{
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
