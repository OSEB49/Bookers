var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const person = 'plumber';
const Service = require('../models/serviceSchema.js');

const passport = require('passport');
function authPerson(req,res,next){
  User.findById(req.user,(err,data)=>{
    console.log(data);
  })
  
  
  if(req.isAuthenticated()& req.user.role==='ADMIN')
  {
    next();
  }
  else if(req.user.role==='PLUMBER'){
    res.redirect('/worker/plumber')
    console.log(req.user)
  }
  else if(req.user.role==='ELECTRICIAN'){
    res.redirect('/worker/electrician')
  }
  else if(req.user.role==='GARDENER'){
    res.redirect('/worker/gardener')
  }
  else if(req.user.role==='USER'){
    res.redirect('/workers')
  }
  else{
    res.redirect('/')
  }

}
/* GET home page. */
router.get('/', function(req, res, next) {
  Service.find({'person':person}, (err,data)=>{
    
    res.render('crudPlumber', { title: 'Hydraulik CRUD', data });
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

router.patch('/:id', async (req,res)=>{
  
  const id =  mongoose.Types.ObjectId(req.params);
  console.log(req.body)
    
   try{
    await Service.findByIdAndUpdate(req.params.id, req.body);
    
    res.status(200).send();
    await Service.save();
    
   } 
   catch(err)
   {
     console.log(err)
   } 
  
  

})
router.post('/admin/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
