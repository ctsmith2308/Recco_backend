let knex = require('../knex')
let express = require('express')
let router = express.Router()


router.post('/', function (req, res, next){
  let {id , token, username, bio } = req.body
  console.log('this is the req from the front end', req.body);
})

module.exports = router
