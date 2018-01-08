let knex = require('../knex')
let express = require('express')
let router = express.Router()

let admin = require("firebase-admin");
let url = require('../config')
let serviceAccount = require("../manager.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: url
// })

router.post('/username', function (req, res, next){
  let {id , token, username, bio } = req.body
  console.log('this is the req from the front end', req.body);
    admin.auth().verifyIdToken(id)
    .then((id)=>{
      console.log('decoded id====>', id);
    })
})

module.exports = router
