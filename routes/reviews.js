let knex = require('../knex')
let express = require('express')
let router = express.Router()


router.get('/:id', function(req, res, next){
  let tokenHeader = req.headers['x-access-token']
  if(tokenHeader){
    knex('reviews')
    .select('*')
    .where('user_id', req.params.id)
    .then((response)=>{
      res.send(response)
    })
  } else {
    return res.status(403).send({
      message:'Access Denied'
    })
  }
})

router.post('/', function(req, res, next){
  let tokenHeader = req.headers['x-access-token']
    if(tokenHeader){
      let {  userID, userReview, lat, long, name, address, website, phoneNumber } = req.body
      let postBody = {
        user_id: userID,
        user_review: userReview,
        lat,
        long,
        name,
        address,
        website,
        phone_number:phoneNumber
      }
      knex('reviews')
      .insert(postBody)
      .then((response)=>{
        res.sendStatus(200)
      })
  } else {
    return res.status(403).send({
      message:'Access Denied'
    })
  }
})

module.exports = router
