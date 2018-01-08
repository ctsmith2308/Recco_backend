let express = require('express');
let router = express.Router();
let knex = require('../knex')
let admin = require("firebase-admin");
let url = require('../config')
let serviceAccount = require("../manager.json");
//
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: url
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
    .select('*')
    .then((data) => {
      res.send(data)
    })
});
/* GET user based on ID. */
router.get('/:id', function(req, res, next) {
  let idToken = req.params.id
  admin.auth().verifyIdToken(req.params.id)
    .then((decodedToken) => {
      let uid = decodedToken.uid;
      knex('users')
        .select('id')
        .where('uid', decodedToken.uid)
        .then((data) => {
          let userID = {
            user_id: data[0].id,
            userToken: req.params.id
          }
          res.send(userID)
        })
    }).catch(function(error) {
      res.send(error)
    })
})
/* POST new user. */
router.post('/', function(req, res, next) {
  admin.auth().verifyIdToken(req.body.token)
    .then((decodedToken) => {
      let uid = decodedToken.uid;
      let newUser = {
        email: req.body.email,
        uid
      }
      knex('users')
        .insert(newUser, "*")
        .then((newUser) => {
          let userID = {
            user_id: newUser[0].id,
            userToken: req.body.token
          }
          res.send(userID)
        })
    }).catch(function(error) {});
})

/* Post username and bio */
router.post('/username', function (req, res, next){
  let {id , token, username, bio } = req.body
  console.log('this is the req from the front end', token);
    admin.auth().verifyIdToken(token)
    .then((decodedToken)=>{
      console.log('decoded uid====>', decodedToken.uid);
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
