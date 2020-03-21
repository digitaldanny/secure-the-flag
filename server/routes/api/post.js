const express = require('express')
const router = express.Router()
const url = require('url')
const db = require('../../config/keys').pgURL
const bcrypt = require("bcrypt")
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

    let csrf_token = req.body.csrf_token
    let username = req.body.username

    bcrypt.compare(username, csrf_token, function(err, result) {
      if (!result) {
        throw "csrf_token does not match. Possible csrf attack";
      }
    });

    let post = req.body.post
    jwt.verify(username,'secret',(error,usernameValue)=>{

            if(error){
              res.status(401).send("Refresh Page and Log Back in to work");
            }
            else{
              pool.query('INSERT INTO post (username, post) VALUES ($1, $2)', [usernameValue.data, post], (error, results) => {
                if (error) {

                  throw error;
                }

              res.status(200).send("Added Post")

               });
            }
        });

    })

    router.get('/getPosts', (req,res)=>{

        const { username } = req.query;

        jwt.verify(username,'secret',(err,usernameValue)=>{
          if(err){
            res.status(401).send("Refresh Page and Log Back in to work");
          }else{

            pool.query(`SELECT * FROM post WHERE username= '${usernameValue.data}' `, (error, results) => {
              if (error) {
                throw error
              }

              if(results.rows.length >0){
              res.status(200).send(results.rows)
              }
            
           });
        }
})

})


router.get('/getOtherPost', (req,res)=>{

    const { username } = req.query
   //Strong version wraps it as a string
    //Removes quoted from string
    var strWithOutQuotes= username.replace(/[()/-/'"]+/g, '')
    // console.log(strWithOutQuotes)
    pool.query(`SELECT * FROM post WHERE username= '${strWithOutQuotes}'`, (error, results) => {
        if (error) {
          throw error
        }
        // console.log(results)
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
