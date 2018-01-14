let express = require('express')
let router = express.Router()
let knex = require('../knex')


// let admin = require("firebase-admin");
// let url = require('../config')
// let serviceAccount = require("../manager.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: url
// })

router.get('/', function(req, res, next){
  knex('dashboard')
  .select('username','user_id')
  .then(data=>{
    res.send(data)
  })
})


router.get('/:id', function(req, res, next){
  let userID = req.params.id
  knex('dashboard')
  .select('username','bio')
  .where('user_id', userID)
  .then((data)=>{
    res.send(data[0])
  })
})

/* Figure this out for Firebase later */
// router.post('/username', function (req, res, next){
//   let {id , token, username, bio } = req.body
//   console.log('this is the req from the front end', req.body);
//     admin.auth().verifyIdToken(id)
//     .then((id)=>{
//       console.log('decoded id====>', id);
//     })
// })

module.exports = router
