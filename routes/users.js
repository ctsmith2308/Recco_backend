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

/* GET user based on ID. */
router.get('/:id', function(req, res, next) {
  let idToken = req.params.id
  admin.auth().verifyIdToken(req.params.id)
    .then((decodedToken) => {
      let uid = decodedToken.uid;
      knex('users')
        .select('id','email')
        .where('uid', decodedToken.uid)
        .then((data) => {
          let userID = {
            user_id: data[0].id,
            email:data[0].email,
            userToken: req.params.id
          }
          res.send(userID)
        })
    }).catch(function(error) {
      res.send('access denied')
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
            email:newUser[0].email,
            userToken: req.body.token
          }
          res.send(userID)
        })
    }).catch((error)=>{
      console.log(error);
    });
})

let noUserInfo = (userID, username, bio, name, res) => {
  let profileInfo = {
    username,
    bio,
    name,
    user_id: userID
  }
  knex('dashboard')
  .insert(profileInfo, '*')
  .then((data) => {
    res.send(data[0])
  })
}

let hasUserInfo = (userID, username, bio, name, res) => {
  let newProfileInfo = {
    username,
    bio,
    name,
  }
    knex('dashboard')
    .where('user_id', userID)
    .update(newProfileInfo)
    .then((data) => {
      res.send(data[0])
    })
    .catch((error)=>{
      res.status(405).send(error)
    })
}

  let userLog = (userID, username, bio, name, res) => {
    knex('dashboard')
    .select('user_id')
    .where('user_id', userID)
    .then((data) => {
        if(data.length === 0){
          // function that inserts bio and username and returns PK
          noUserInfo(userID, username, bio, name, res)
        } else {
          //function that updates bio, username, name and returns PK
          hasUserInfo(userID, username, bio, name, res)
        }
    })
  }

/* Post username and bio */
router.post('/username', function (req, res, next){
  //passes here
  let { token, userID, username, bio, name } = req.body
    admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      knex('users')
      .where('uid', decodedToken.uid )
      .select('id')
      .then((returningId) => {
        if(returningId[0].id === userID){
          userLog(userID, username, bio, name, res)
        }
      })
    })
})

/* DELETE user */
// router.delete('/:id', function(req, res, next) {
//   const id = req.params.id
//   knex('users')
//     .del()
//     .where('id', id)
//     .then((data) => {
//       let deletedUser = {
//         username: data.username,
//         hashedToken: data.hashed_token
//       }
//       res.send(deletedUser)
//     })
// })


module.exports = router;
