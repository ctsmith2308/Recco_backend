let knex = require('../knex')
let express = require('express')
let router = express.Router()


//
/* GET list of favorites bases on user_id */
router.get('/:id', function(req, res, next){
  let tokenHeader = req.headers['x-access-token']
  console.log('here is the clicked user', req.params.id);
  knex('favorites')
  .where('favorites.user_id', req.params.id)
  .join('dashboard', 'favorites.user_id','dashboard.user_id')
  .select('dashboard.user_id','dashboard.username','dashboard.name','dashboard.bio','favorites.name','favorites.lat','favorites.long','favorites.website','favorites.phone_number','favorites.address')
  .then((data) => {
    console.log('here is the data ===>', data);
    res.send(data)
  })
  .catch((error) => {
    res.send(error)
  })
})

/* POST new favorite */
router.post('/', function(req, res, next){
  let tokenHeader = req.headers['x-access-token']
  if(tokenHeader){
    let user_id = req.body.userID
    let { name, phoneNumber, latitude, longitude, website, address } = req.body.locationInfo.coordinates
    let postBody = {
      user_id,
      name,
      address,
      website,
      phone_number:phoneNumber,
      long:longitude,
      lat: latitude
    }
    knex('favorites')
    .insert(postBody, "*")
    .then((data) => {
      res.send(data)
    })
    .catch((error)=>{
      res.send(error)
    })
  } else {
    return res.status(403).send({
      message:'Access Denied'
    })
  }
})


module.exports = router
