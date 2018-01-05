let express = require('express');
let router = express.Router();
let knex = require('../knex')
let admin = require("firebase-admin");
let url = require('../config')

let serviceAccount = require("../manager.json");

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
router.get('/:id', function(req, res, next){
  let idToken = req.params.id
  admin.auth().verifyIdToken(idToken)
  .then((decodedToken) => {
    let uid = decodedToken.uid;
  //     knex('users')
  //     .select('username')
  //     .where('id', id)
  //     .then((data) => {
  //       res.send(data)
  //     })
  //   }).catch(function(error) {
  //   console.log('backend error', error);
  })

})
/* POST new user. */
router.post('/', function(req, res, next){
  // console.log('this is the hashed token', req.body.token);
  // console.log('this is the users email', req.body.email);
  admin.auth().verifyIdToken(req.body.token)
  .then((decodedToken)=> {
    var uid = decodedToken.uid;
    console.log('this is the decoded token', uid);
  }).catch(function(error) {
    console.log('nope you got an error', error);
  });
  // knex('users')
  // .insert(req.body,"*")
  // .then((newUser) => {
  //   res.send(newUser)
  // })
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
