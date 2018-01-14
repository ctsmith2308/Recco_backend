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
  console.log('here is the backend token', idToken)
  admin.auth().verifyIdToken(req.params.id)
    .then((decodedToken) => {
      let uid = decodedToken.uid;
      console.log('here is the uid', uid);
      knex('users')
        .select('id')
        .where('uid', decodedToken.uid)
        .then((data) => {
          console.log('here is the data', data[0]);
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
  console.log('i was tagged');
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

let noUserInfo = (userID, username, bio, res) => {
  let profileInfo = {
    username,
    bio,
    user_id: userID
  }

  knex('dashboard')
  .insert(profileInfo, '*')
  .then((data) => {
    res.send(data[0])
  })
}

let hasUserInfo = (userID, username, bio, res) => {
  let newProfileInfo = {
    username,
    bio
  }
    knex('dashboard')
    .where('user_id', userID)
    .update(newProfileInfo)
    .then((data) => {
      res.send(data[0])
    })
}

let userLog = (userID, username, bio, res) => {

    knex('dashboard')
    .select('user_id')
    .where('user_id', userID)
    .then((data) => {
        if(data.length === 0){
          // function that inserts bio and username and returns PK
          noUserInfo(userID, username, bio, res)
        } else {
          //function that updates bio and username and returns PK
          hasUserInfo(userID, username, bio, res)
        }
    })
}

/* Post username and bio */
router.post('/username', function (req, res, next){
  //passes here
  let { token, userID, username, bio } = req.body
    admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      knex('users')
      .where('uid', decodedToken.uid )
      .select('id')
      .then((returningId) => {
        if(returningId[0].id === userID){
          userLog(userID, username, bio, res)
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
