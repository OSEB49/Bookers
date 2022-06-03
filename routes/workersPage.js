var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('workersPage', { title: 'Express' });
});
router.post('/', (req,res)=>{
  const body = req.body.person;
  console.log(body);
  res.redirect(`/${body}`);
})
module.exports = router;
