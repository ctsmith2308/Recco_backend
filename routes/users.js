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
    }).catch((error)=>{
      console.log(error);
    });
})

let noUserInfo = (id, username, bio, res) => {
  console.log('log from noUserInfo ===> ', id, username, bio);
  let profileInfo = {
    username,
    bio,
    user_id: id
  }

  knex('dashboard')
  .insert(profileInfo, '*')
  .then((data) => {
    res.send(data[0])
  })
}

let hasUserInfo = (id, username, bio, res) => {
  console.log('log from hasUserInfo ===> ', id, username, bio);
  let newProfileInfo = {
    username,
    bio
  }
    knex('dashboard')
    .where('user_id', id)
    .update(newProfileInfo)
    .then((data) => {
      res.send(data[0])
    })
}

let userLog = (id, username, bio, res) => {
  console.log('log from userLog ===>', id, username, bio);

    knex('dashboard')
    .select('user_id', id)
    .then((data) => {
      console.log('I made it into the knex call inside userLog');
        if(data.length === 0){
          // function that inserts bio and username and returns PK
          console.log('data length === 0');
          noUserInfo(id, username, bio, res)
        } else {
          //function that updates bio and username and returns PK
          console.log('data length > 0');
          hasUserInfo(id, username, bio, res)
        }
    })
}

/* Post username and bio */
router.post('/username', function (req, res, next){
  let { token, id, username, bio } = req.body
    admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      knex('users')
      .where('uid', decodedToken.uid )
      .select('id')
      .then((returningId) => {
        if(returningId[0].id === id){
          console.log('hitting if conditional to fire userLog function');
          userLog(id, username, bio, res)
        }
      })
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
