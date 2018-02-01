let express = require('express')
let router = express.Router()
let knex = require('../knex')

router.get('/', function(req, res, next){
  let headerToken = req.headers['x-access-token']
    if(headerToken){
      knex('dashboard')
      .select('username','bio','name','image_url','dashboard.user_id',)
      .join('photos','photos.user_id','dashboard.user_id')
      .then(data=>{
        res.send(data)
      })
    } else {
      return res.status(403).send({
        message:'Access Denied'
      })
    }
})

router.get('/:id', function(req, res, next){
  let tokenHeader = req.headers['x-access-token']
  if(tokenHeader){
    let userID = req.params.id
    knex('dashboard')
    .join('photos','photos.user_id','dashboard.user_id')
    .where('dashboard.user_id', userID)
    // .select('username','bio','name')
    .select('username','bio','name','image_url')
    .then((data) => {
      console.log('im the data',data[0]);
      res.send(data[0])
    })
  } else {
    return res.status(403).send({
      message:'Access Denied'
    })
  }
})


module.exports = router
