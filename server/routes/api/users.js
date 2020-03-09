const express = require('express')
const router = express.Router()
const url = require('url')
const db = require('../../config/keys').pgURL
const bcrypt = require("bcrypt")
const Pool = require('pg').Pool
var jwt = require('jsonwebtoken');
// import { createToken } from '../../helper/helper'
var conString = url.parse(process.env.ELEPHANTSQL_URL || db)
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





router.post('/signup', (req,res)=>{
   
    const { username, email,password} = req.body
    // console.log("username is" + req.body.username)
   
    
    const check = checkUser(username)
    if(check){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    pool.query('INSERT INTO users (username, email,password) VALUES ($1, $2,$3)', [username, email,hash], (error, results) => {
      if (error) {
        // throw error;
        res.send(error.detail);
        return;
      }
   
    res.status(200).send("Registered")
    
    })
  }
  else{
    res.status(400).send({message:"Username Taken"})
  }

    
   
  
  
})

router.post('/signin', (req,res)=>{
   
    const { username,password } = req.body
    // console.log("username is" + req.body.username)
  if(username != null && password != null){
    pool.query(`SELECT * FROM users`,  (error, results) => {
      if (error) {
        throw error
      }
      bcrypt.compare(password, results.rows[0].password, function(err, res) {
        if (err){
          // handle error
          console.log(err)
          throw err;
        }
        if (res){
            var token = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (60 * 60),
              data: username
            }, 'secret');
            var payload ={
              token:token,
              login:true,
              message:"Signed In"
            }
            
            res.status(200).json(payload)
        } 
        
        
      });
    
   
    })
  }
})

checkUser = (username) => {
  let val = true;
    pool.query(`SELECT * FROM users`,  (error, results) => {
      if (error) {
        throw error
      }
      else if(results.rows[0].username === username){
        //if false user in db
        console.log(results.rows[0].username)
      return false;
      }else{
        //IF true then username not in db
        console.log(results.rows[0].username)
        val = true;
      }
    }
  )
    // console.log(val)
    return true;
}




module.exports = router