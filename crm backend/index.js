
const express=require('express')
const cors=require('cors');
const connect = require('./connectdb');
require('dotenv').config();
const app=express();

app.use(express.json())
app.use(express.static("images"));
app.use(cors())
connect();
app.use('/',require('./routes/admin'));



app.listen(process.env.PORT,()=>
{
    console.log(`server is running on port:${process.env.PORT}`);
})