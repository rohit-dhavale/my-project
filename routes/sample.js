const express = require('express');
const sampleRoutes = express.Router();
const dbo = require('../db/conn');
sampleRoutes.post('/sampledata',(req,res)=>{
    const dbConnect = dbo.getDb();
    dbConnect.collection('sample').insertOne(req.body ,function (err, result) {
        if (err) {
          res.send('Error');
        } else {
          res.send('Record Inserted');
        }
      });
  });
sampleRoutes.get('/sampledata',(req,res)=>{
  const dbConnect = dbo.getDb();
  dbConnect.collection('sample').find({}).toArray(function (err, result) {
      if (err) {
        res.send('Error');
      } else {
        res.json(result);
      }
    });
});
module.exports = sampleRoutes;