const Pool = require('pg').Pool;
const url = require('url');
const db = require('../../../config/keys').pgURL;
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

  function verifyUser(possibleUsername) {
    
    pool.query(`SELECT * FROM users WHERE username='${possibleUsername}'`)
    .then((results)=>{
      console.log(results.rows[0].email);
      if (results.rows[0].username != possibleUsername){
        return false;
      }
      else{
          return true;
      }

    })
    .catch((error)=>{
      throw error;
    });

  }

  module.exports = { verifyUser};