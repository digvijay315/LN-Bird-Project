
const express=require('express')
const cors=require('cors');
const path = require('path');
const connect = require('./connectdb');
const bodyParser = require('body-parser');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app=express();

app.use(bodyParser.json())
app.use(express.json())
app.use('/images', express.static('images'));
app.use(cors())
connect();

app.use('/',require('./routes/admin'));


app.listen(process.env.PORT,()=>
{
    console.log(`server is running on port:${process.env.PORT}`);
})