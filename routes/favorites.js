let knex = require('../knex')
let express = require('express')
let router = express.Router()

/* GET list of favorites */
router.get('/', function(req, res, next){
  knex('favorites')
  .select('*')
  .then((data) => {
    res.send(data)
  })
  .catch((error) => {
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

/* POST new favorite */
router.post('/', function(req, res, next){
  knex('favorites')
  .insert(req.body, "*")
  .then((data) => {
    res.send(data)
  })
  .catch((error)=>{
    res.send(error)
  })
})
/* DELETE favorite */
// router.delete('/:id', function(req, res, next){
//   console.log('here is the user id', req.params.id);
//   // console.log('here is the rest id', req.params.restId);
//
//  // knex('favorites')
//  //  .where({
//  //    user_id: req.params.id,
//  //    restaurant_id: req.params.restId
//  //  })
//  //  .del()
//  //  .then((data)=>{
//  //    res.send(data)
//  //  })
// })
//
// const deleteFavorite = (req,res,sendit)=>{
//   if(!req.params.id) res.sendStatus(404)
//   knex('favorites')
//   .where({
//     restaurant_id: req.params.id,
//     user_id: req.params.userId
//   })
//   .del()
//   .then(
//     res.sendStatus(200))
// }
//
// '/favorites/:id/:userId'

router.delete('/:userId/:restaurantId', function(req, res, next){
  knex('favorites')
  .where({
    user_id: req.params.userId,
    restaurant_id: req.params.restaurantId
  })
  .del()
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    res.send(error)
  })
})

// router.delete('/', function(req, res, next){
//   knex('favorites')
//   .del()
//   .where({
//     user_id: req.query.user,
//     restaurant_id: req.query.restaurant
//   })
//   .then((data) => {
//     res.send(data)
//   })
//   .catch((error) => {
//     res.send(error)
//   })
// })

module.exports = router
