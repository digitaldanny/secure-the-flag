const express = require('express');
const router = express.Router();
const url = require('url');
const db = require('../../config/keys').pgURL;
const bcrypt = require("bcrypt");
const encoder = require('./helpers/encoder');
const verifier = require('./helpers/verifier');
const Pool = require('pg').Pool
var jwt = require('jsonwebtoken');
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

const pool = new Pool(config)

router.post('/addPost', (req,res)=>{
   
    let username = req.body.username
    let post = req.body.post
    try {

      var usernameValue = encoder.decodeBase64(username);
      
      if(!verifier.verifyUser(usernameValue)){
        res.status(401).send("Refresh Page and Log Back in to work");
      }

    }catch(e){
        res.status(401).send("Refresh Page and Log Back in to work")
    }
    console.log("we here")
    pool.query('INSERT INTO post (username, post) VALUES ($1, $2)', [usernameValue, post], (error, results) => {
      if (error) {
        // throw error;
        res.send(error.detail);
        return;
      }
    
    res.status(200).send("Added Post")
    
    })
})

router.get('/getPosts', (req,res)=>{
   
    const { username } = req.query
   
    try {
      var usernameValue = encoder.decodeBase64(username);
      
      if(!verifier.verifyUser(usernameValue)){
        res.status(401).send("Refresh Page and Log Back in to work");
      }

   
    }catch(e){
       res.status(401).send("Refresh Page e Log Back in to work")
    }
    // console.log(usernameValue)
    pool.query(`SELECT * FROM post WHERE username= '${usernameValue}' `, (error, results) => {
      if (error) {
        throw error
      }

      if(results.rows.length >0){
      res.status(200).send(results.rows)
      }
    })
    // res.status(401).send("Refresh Page e Log Back in to work")
  
})


router.get('/getOtherPost', (req,res)=>{
   
    const { username } = req.query

    //Strong version wraps it as a string
    //Removes quoted from string
    //var strWithOutQuotes= username.replace(/[()/-/'"]+/g, '')
    
    // pool.query(`SELECT * FROM post WHERE username= '${username} '`, (error, results) => {
    //     if (error) {
    //       throw error
    //     }
  
    //     if(results.rows.length >0){
    //     res.status(200).send(results.rows)
    //     }
    //   })
     
   //This will break if you use 105' OR '1'='1 || a' or 'a' = 'a
   try {
    var usernameValue = encoder.decodeBase64(username);
    
    if(!verifier.verifyUser(usernameValue)){
      res.status(401).send("Refresh Page and Log Back in to work");
    }

 
  }catch(e){
     res.status(401).send("Refresh Page e Log Back in to work")
    } 
   
   pool.query(`SELECT * FROM post WHERE username= '${username}' `, (error, results) => {
      if (error) {
        throw error
      }

      if(results.rows.length >0){
        res.status(200).send(results.rows)
      }else{
        res.status(204).send(results.rows)
      }
    })
   
  
})

    checkUser = (username) => {
    let val = true;
        pool.query(`SELECT * FROM users`,  (error, results) => {
        if (error) {
            throw error
        }
        else if(results.rows[0].username === username){
            //if false user in db
        
        return false;
        }else{
            //IF true then username not in db
        
            val = true;
        }
        }
    )
        
        return true;
    }




module.exports = router