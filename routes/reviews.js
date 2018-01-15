let knex = require('../knex')
let express = require('express')
let router = express.Router()


router.get('/:id', function(req, res, next){
  console.log('here is the foodies id' , req.params.id);
  knex('reviews')
  .select('*')
  .where('user_id', req.params.id)
  .then((response)=>{
    // let resBody = {
    //   userReview: res[0].user_review,
    // }
    console.log(response);
    // res.send(response)
  })
})

router.post('/', function(req, res, next){
  let {  userID, userReview, lat, long, name, address} = req.body
  let postBody = {
    user_id: userID,
    user_review: userReview,
    lat,
    long,
    name,
    address
  }
  knex('reviews')
  .insert(postBody)
  .then((response)=>{
    res.sendStatus(200)
  })
})

module.exports = router
