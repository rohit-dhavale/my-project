const express = require('express');
const mongodb = require('mongodb').MongoClient;
const app = express();
let db;
const port = process.env.PORT || 3000;
app.use(express.json());
const url = `mongodb://localhost:27017/companydb`;
mongodb.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err,client)=>{
    db = client.db();
    app.listen(port,()=>{
        console.log(`Connection is on port ${port}`);
    });
});