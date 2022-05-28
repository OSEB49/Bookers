
var express = require('express');
var router = express.Router();
const Service = require('../models/serviceSchema.js');
const mongoose = require('mongoose');
const Appointment = require('../models/appointmentSchema');
const person = 'electrician';

/* GET home page. */
router.get('/', function(req, res, next) {
  Service.find({'person':person}, (err,data)=>{
    res.render('electricianService', { title: 'Elektryk', data });
  })
  
});

router.post('/', async (req,res)=>{
  const body = req.body;
  //const id = mongoose.Types.ObjectId(body.service);
  const checkboxLength = body.service.length;
  const id = body.service

try{
 for(i=0; i<body.service.length; i++)
  {
    Service.findOne({_id: id[i]}, (err,data)=>{
    console.log(data);
    const newBook =  new Appointment({
      person: person,
      username: body.name,
      nameService: data.nameOfService,
      email: body.email,
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
