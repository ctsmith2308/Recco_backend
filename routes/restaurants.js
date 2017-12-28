var express = require('express');
var router = express.Router();
var knex = require("../knex")

/* GET restaurant listing. */
router.get('/', function(req, res, next){
  knex('restaurants')
  .select('*')
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    res.send(error)
  })
})
/* GET restaurant based on ID */
router.get('/:id', function(req, res, next){
  let id = req.params.id
  knex('restaurants')
  .select('name')
  .where('id', id)
  .then((data)=>{
    res.send(data)
  })
  .catch((error)=>{
    res.send(error)
  })
})
/* POST new restaurant */
/* POTENTIALLY NEED TO ADD LAT AND LONG */
router.post('/', function(req, res, next){
  knex('restaurants')
  .insert(req.body,'*')
  .then((newRestaurant)=>{
    res.send(newRestaurant)
  })
  .catch((error)=>{
    res.send(error)
  })
})
/* DELETE restaurant */
router.delete('/:id', function(req, res, next){
  let id = req.params.id
  knex('restaurants')
  .del()
  .where('id', id)
  .then((deleted) => {
    let deletedRestaurant = {
      name:deleted.name
    }
    res.send(deletedRestaurant)
  })
  .catch((error)=>{
    res.send(error)
  })
})


module.exports = router
