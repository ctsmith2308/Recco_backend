let knex = require('../knex')
let express = require('express')
let router = express.Router()


router.get('/:id', function(req, res, next){
  console.log(req.params.id);
  knex('reviews')
  .select('user_review')
  .where('user_id', req.params.id)
  .then((res)=>{
    let resBody = {
      userReview: res[0].user_review,
    }
    console.log(resBody);
    // res.send(resBody)
  })
})

router.post('/', function(req, res, next){
  let { userID, userReview } = req.body
  let body = {
    user_id: userID,
    user_review: userReview,
  }
  knex('reviews')
  .insert(body)
  .then((response)=>{
    res.send(response)
  })
})

module.exports = router
