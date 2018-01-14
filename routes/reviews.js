let knex = require('../knex')
let express = require('express')
let router = express.Router()


router.get('/:id', function(req, res, next){
  console.log(req.params.id);
  knex('reviews')
  .select('user_review','place_id')
  .where('user_id', req.params.id)
  .then((res)=>{
    let resBody = {
      userReview: res[0].user_review,
      placdID: place_id
    }
    console.log(resBody);
    // res.send(resBody)
  })
})

router.post('/', function(req, res, next){
  let { userID, userReview, placeID } = req.body
  let body = {
    user_id: userID,
    user_review: userReview,
    place_id: placeID
  }
  knex('reviews')
  .insert(body)
  .then((response)=>{
    res.send(response)
  })
})

module.exports = router
