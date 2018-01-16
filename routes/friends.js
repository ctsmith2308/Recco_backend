let express = require('express')
let router = express.Router()
let knex = require('../knex')

// router.get('/:id', function(req, res, next){
//   knex('friends')
//   .select('dashboard.user_id','dashboard.bio','dashboard.username')
//   .where('friends.user_id', req.params.id)
//   .join('dashboard','friends.friend_id','dashboard.user_id')
//   .then((response)=>{
//     console.log('here is the response', response);
//     res.send(response)
//   })
// })


router.get('/:id', function(req, res, next){
  knex('friends')
  .where('friends.user_id', req.params.id)
  .join('dashboard','friends.friend_id','dashboard.user_id')
  .join('photos','photos.user_id','dashboard.user_id')
  .select('dashboard.user_id','dashboard.bio','dashboard.username','image_url')
  .then((response)=>{
    console.log(response);
    res.send(response)
  })
})
router.post('/', function(req, res, next){
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
})



module.exports = router
