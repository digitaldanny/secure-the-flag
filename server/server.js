const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const app = express()
const users = require('./routes/api/users')
const post = require('./routes/api/post')
// const db = require('./config/keys').pgURL
//BodyParser MiddleWare
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Use Routes if url specified
app.use('/api/users',users)
app.use('/api/post',post)

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => 
    {
      res.sendFile(path.resolve(__dirname, 'client','stf','build', 'index.html'));
    });
  }

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`))