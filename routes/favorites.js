let knex = require('../knex')
let express = require('express')
let router = express.Router()

/* GET list of favorites */
router.get('/', function(req, res, next){
  knex('favorites')
  .select('*')
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    res.send(error)
  })
})

/* GET list of favorites bases on user_id */
router.get('/userfavorites', function(req, res, next){
  knex('favorites')
  .where('user_id', req.query.q)
  .select('restaurant_id')
  .then((data) => {
    res.send(data)
  })
  .catch((error) => {
    res.send(error)
  })
})

//post new favorite
//delet favorite
module.exports = router
