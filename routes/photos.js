const express = require('express')
const router = express.Router()
const knex = require('../knex')

router.get('/:id', function (req, res, next){
  let id = req.params.id
  // console.log('here is the id', id);
  // // console.log('im the params ID', req.params.id);
  // console.log('made it to the route');
  knex('photos')
  .select('image_url')
  .where('user_id', req.params.id)
  .then((response)=>{
    console.log('im the url', response[0]);
    res.send(response[0])
  })
})

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
