const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const app = express()
const users = require('./routes/api/users')
// const db = require('./config/keys').pgURL
//BodyParser MiddleWare
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//DB config
// const db = require('./config/keys').mongoURI
// var conString = process.env.ELEPHANTSQL_URL || db
// var client = new Pool.Client(conString);

// Use Routes if url specified
app.use('/api/users',users)
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
// //Connect mongoose
// mongoose
//     .connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
//     .then(() => console.log("MongoDb Connected..."))
//     .catch(err => console.log(err))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`))