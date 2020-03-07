const express = require('express')
const router = express.Router()
const url = require('url')
const db = require('../../config/keys').pgURL
const bcrypt = require("bcrypt")

var conString = url.parse(process.env.ELEPHANTSQL_URL || db)
const Pool = require('pg').Pool
const auth = conString.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: conString.hostname,
  port: conString.port,
  database: conString.pathname.split('/')[1],
  ssl: true
};
const saltRounds = 10
const pool = new Pool(config)

//Item Model 
//route.get is retrieving all with route 'api/items/'
//{date:1 } ascending order and -1 is descending
const User = require('../../model/user')
router.get('/', (req,res)=>{
    // console.log("yee")
    User.find().sort({date:-1}).then(users => res.json(users))
  
})

router.post('/signup', (req,res)=>{
    // console.log("yee")
    // Item.find().sort({date:-1}).then(items => res.json(items))
    const { username, email,password } = req.body
    console.log("username is" + req.body.username)
    var post_body = req.body;
    // Return the POST message
    // res.send(post_body);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    pool.query('INSERT INTO users (username, email,password) VALUES ($1, $2,$3)', [username, email,hash], (error, results) => {
      if (error) {
        throw error
      }
    console.log(__dirname)
    // res.sendFile(__dirname + '/dashboard.html')
   
    res.status(200).send(`Added`)
    
    })
  
})

router.post('/signin', (req,res)=>{
    // console.log("yee")
    // Item.find().sort({date:-1}).then(items => res.json(items))
    const { usernamepassword } = req.body
    console.log("username is" + req.query)
    pool.query('INSERT INTO users (username, email,password) VALUES ($1, $2,$3)', [username, email,password], (error, results) => {
      if (error) {
        throw error
      }
      res.writeHead(302, {
        'Location': '/signin.html'
        //add other headers here...
      });
      res.end();
    
    })
  
})



// router.delete('/:id', (req,res)=>{
//     // console.log("yee")
//     // Item.find().sort({date:-1}).then(items => res.json(items))
//    User.findById(req.params.id).then(user => user.remove(() => res.json({success:true})))
//    .catch(err => res.status(404).json({success:false}))
// })
module.exports = router