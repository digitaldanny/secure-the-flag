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
   
    let username = req.query.username
    let post = req.body.post;
    let verified;
    let usernameValue = encoder.decodeBase64(username);
    
    // first verify user 
    pool.query(`SELECT * FROM users WHERE username='${usernameValue}'`)
    .then((results)=>{
      if (results.rows[0].username != usernameValue){
          verified= false;
      }else{
        verified = true;
      }
      
    })
    .catch((error)=>{
      throw error;
    })
    .finally(()=>{
      // after verification insert post
      if(verified){
        pool.query(`INSERT INTO post (username, post) VALUES ('${usernameValue}', '${post}')`)
        .then((results)=>{
          res.status(200).send("Added Post");
        })
        .catch((error)=>{
            res.send(error);
        });
        
      }
      else{
        res.status(401).send("Refresh Page and Log Back in to work");
      }

    }) 

});

router.get('/getPosts',(req,res)=>{

  const username= req.query.username;
  let usernameValue = encoder.decodeBase64(username);
  
  let verified;
  pool.query(`SELECT * FROM users WHERE username='${usernameValue}'`)
  .then((results)=>{
    if (results.rows[0].username != usernameValue){
        verified= false;
    }else{
      verified = true;
    }
    
  })
  .catch((error)=>{
    throw error;
  }).finally(()=>{

    if(verified){

      pool.query(`SELECT * FROM post WHERE username= '${usernameValue}'`)
      .then((results)=>{
        if(results.rows.length >0){
          res.status(200).json(results.rows);
        }
      })
      .catch((error)=>{
        throw error;
      });
    
    }else{
      res.status(401).send("Refresh Page and Log Back in to work");
    }   
    
  });

});


router.get('/getOtherPost', (req,res)=>{
   
    const username = req.query.username;
    
    pool.query(`SELECT * FROM post WHERE username= '${username}'`)
    .then((results)=>{

          res.status(200).status(results.rows);
        }
    )
    .catch((error)=>{
      throw error;
    });
});

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