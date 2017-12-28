var express = require('express');
var router = express.Router();
var knex = require('../knex')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
  .select('*')
  .then((data) => {
    res.send(data)
  })
});
/* GET user based on ID. */
router.get('/:id', function(req, res, next){
  let id = req.params.id
  knex('users')
  .select('username')
  .where('id', id)
  .then((data) => {
    res.send(data)
  })
})
/* POST new user. */
router.post('/', function(req, res, next){
  knex('users')
  .insert(req.body,"*")
  .then((newUser) => {
    res.send(newUser)
  })
})
/* DELETE user */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id
  knex('users')
  .del()
  .where('id', id)
  .then((data) => {
    let deletedUser = {
      username: data.username,
      hashedToken: data.hashed_token
    }
    res.send(deletedUser)
  })
})


module.exports = router;
