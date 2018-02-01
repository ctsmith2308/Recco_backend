let express = require('express')
let router = express.Router()
let knex = require('../knex')

router.get('/:id', function(req, res, next){
  let tokenHeader = req.headers['x-access-token']
  if(tokenHeader){
    knex('friends')
    .where('friends.user_id', req.params.id)
    .join('dashboard','friends.friend_id','dashboard.user_id')
    .join('photos','photos.user_id','dashboard.user_id')
    .select('dashboard.user_id','dashboard.bio','dashboard.username','dashboard.name','image_url')
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
  if(req.headers['x-access-token']){
    let { userID, friendID } = req.body
    let postBody = {
      user_id: userID,
      friend_id: friendID
    }
    knex('friends')
    .where(postBody)
    .select('*')
    .then((data)=>{
      if(data.length>0){
        knex('friends')
        .where(postBody)
        .del()
        .then((response)=>{
          res.send({message:'unfollow'})
        })
      }else{
        knex('friends')
        .insert(postBody)
        .returning()
        .then((response)=>{
          res.send({message:'follow'})
        })
      }
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
    let { userID, friendID } = req.body
    let postBody = {
      user_id: userID,
      friend_id: friendID
    }
    knex('friends')
    .insert(postBody)
    .then((data)=>{
      res.sendStatus(200)
    })
  } else {
    return res.status(403).send({
      message:'Access Denied'
    })
  }
})


module.exports = router
