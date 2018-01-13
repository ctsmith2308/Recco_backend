let knex = require('../knex')
let express = require('express')
let router = express.Router()

router.post('/', function(req, res, next){
  console.log('here is the req', req.body);
  let { userID, userReview, placeID } = req.body
  console.log('here is the user id',userID);
  // knex('reviews')
  // .insert()
})

module.exports = router
