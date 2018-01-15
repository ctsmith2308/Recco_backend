let express = require('express')
let router = express.Router()
let knex = require('../knex')

router.get('/:id', function(req, res, next){
  knex('friends')
  .select('dashboard.user_id','dashboard.bio','dashboard.username')
  .where('friends.user_id', req.params.id)
  .join('dashboard','friends.friend_id','dashboard.user_id')
  .then((response)=>{
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
