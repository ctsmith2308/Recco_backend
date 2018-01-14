let express = require('express')
let router = express.Router()
let knex = require('../knex')

router.get('/:id', function(req, res, next){
  console.log('current user from get', req.params.id);
  
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
    console.log('success');
  })
})



module.exports = router
