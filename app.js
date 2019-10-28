'use strict'

const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
// const cors = require('cors')

// app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



module.exports = app;