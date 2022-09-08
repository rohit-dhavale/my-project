require('dotenv').config({ path: './config.env' });
const express = require('express');
// const cors = require('cors');
var session = require('express-session');
const dbo = require('./db/conn');
const bodyParser = require('body-parser');
var upload = require('express-fileupload');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
const sampleRoutes= require('./routes/sample');
const userRoutes= require('./routes/user');
const PORT = process.env.PORT || 3000;
app.use(session({
  secret: 'Rohit@1234',
  resave: true,
  saveUninitialized: true
}));
// app.use(cors());
app.use(upload());
app.use(express.json());
app.use('/sample',sampleRoutes);
app.use('/user',userRoutes);


dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});