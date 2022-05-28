var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const person = 'books';
const Appointment = require('../models/appointmentSchema')

/* GET home page. */
router.get('/', function(req, res, next) {
  Appointment.find({}, (err,data)=>{
    
    res.render('crudBooks', { title: 'ZAMOWIENIA CRUD', data });
  })
     

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
