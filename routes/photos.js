const express = require('express')
const router = express.Router()
const knex = require('../knex')

router.post('/', function (req, res, next){
  let { userID, url }= req.body
  let postBody={
    user_id:userID,
    image_url: url
  }
  knex('photos')
  .insert(postBody)
  .then((response)=>{
    console.log(response);
    res.sendStatus(200)
  })
})

module.exports = router
