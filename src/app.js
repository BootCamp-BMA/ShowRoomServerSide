

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path=require('path')
const roots=require('./routes/defaultRoots')

const app = express();

app.set('view engine','pug')
app.set('views',path.join(__dirname,'./views'))


app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 





app.use('/',roots);








module.exports = app;
