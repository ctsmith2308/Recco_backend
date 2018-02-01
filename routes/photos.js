const express = require('express')
const router = express.Router()
const knex = require('../knex')

router.get('/:id', function (req, res, next){
  let id = req.params.id
  knex('photos')
  .select('image_url')
  .where('user_id', req.params.id)
  .then((response)=>{
    res.send(response[0])
  })
})

router.post('/', function (req, res, next){
  let tokenHeader = req.headers['x-access-token']
  if(tokenHeader) {
    let { userID, url } = req.body
    let postBody={
      user_id:userID,
      image_url: url
    }
    knex('photos')
    .insert(postBody)
    .then((response)=>{
      res.sendStatus(200)
    })
  } else {
    return res.status(403).send({
        message: 'Access Denied'
    });
  }
})

module.exports = router
