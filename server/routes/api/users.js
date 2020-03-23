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
  ssl: {
    rejectUnauthorized : false
  }
  //ssl: true,
};
const saltRounds = 10
const pool = new Pool(config)

router.post('/signup', (req,res)=>{
    console.log("Entered users./signup");
    const { username, email,password} = req.body
    console.log("Registering user: " + username);
    console.log("Registering password: " + password);
    const check = checkUser(username)
    if(check){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    pool.query('INSERT INTO users (username, email,password) VALUES ($1, $2,$3)', [username, email,hash], (error, results) => {
      if (error) {
        // throw error;
        console.log("THERE WAS AN ERROR SIGNING UP");
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

router.post('/signin', (req,response)=>{
    console.log("Entered users./signin");
    const { username,password } = req.body
    //Removes quotes,parenthesis,dashes and semi colons from string
    var strWithOutQuotes= username.replace(/[;()'"-]+/g, '')
    pool.query(`SELECT * FROM users WHERE username= '${strWithOutQuotes}'`,  (error, results) => {
      if (error) {
        throw error
      }
     
      if(results.rows.length !== 0){
        if(strWithOutQuotes === results.rows[0].username){
          bcrypt.compare(password,results.rows[0].password,function(err, res) {
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
                
                response.status(200).json(payload)
            }   else{
              var payload ={
                token:null,
                login:false,
                message:"Error"
              }
              response.status(200).json(payload)
            }
          });
        }}
    else{
      var payload ={
        token:null,
        login:false,
        message:"Error"
      }
      response.status(200).json(payload)
    }
    })
})

checkUser = (username) => {
  let val = true;
   const yerr =  pool.query(`SELECT * FROM users`,  (error, results) => {
      if (error) {
        throw error
      }
      else if(results.rows[0].username == undefined){
        return true;
      }
   
      else{
        //IF true then username not in db
        
        return true;
      }
     
    }
  )
    
    val = yerr;
  
    return val;
}




module.exports = router