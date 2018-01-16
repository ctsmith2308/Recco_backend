let express = require('express')
let router = express.Router()
let knex = require('../knex')



router.get('/', function(req, res, next){
  knex('dashboard')
  .select('username','bio','dashboard.user_id','image_url')
  .join('photos','photos.user_id','dashboard.user_id')
  .then(data=>{
    res.send(data)
  })
})


router.get('/:id', function(req, res, next){
  let userID = req.params.id
  knex('dashboard')
  .join('photos','photos.user_id', 'dashboard.user_id')
  .where('dashboard.user_id', userID)
  .select('username','bio','image_url')
  .then((data)=>{
    console.log('here is the data',data);
    res.send(data[0])
  })
})


module.exports = router
