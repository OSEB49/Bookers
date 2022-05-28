var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const person = 'electrician';
const Service = require('../models/serviceSchema.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  Service.find({'person':person}, (err,data)=>{
    
    res.render('crudElectrician', { title: 'Elektryk CRUD', data });
  })
     

});
router.post('/', (req,res, next)=>{
  const body = req.body.service;
  if(req.body.service)
  {
    res.redirect(`/admin/${body}`);
  }
  else{
    next();
  }
})

router.post('/', async (req,res)=>{
  const body = req.body;
  try{
  const newService = new Service({
    person: person,
    nameOfService: body.nameOfService,
    price: body.priceOfService
  })
  newService.save();
  res.redirect(`/admin/${person}`);
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
    Service.find({'_id': id}, (err,data)=>{
      console.log(err,data[0].nameOfService);
      return res.json({
        name: data[0].nameOfService,
        price: data[0].price
      })
      
      
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
  console.log(id,body);
  res.status(200).send();
  

})

module.exports = router;
