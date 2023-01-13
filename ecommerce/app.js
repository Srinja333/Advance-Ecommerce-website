const express = require("express");//import express

// import mongoose
const mongoose = require('mongoose');

//app

const morgan=require('morgan');

const bodyParser=require('body-parser');

const cookieParser=require('cookie-parser');

const cors=require('cors');

const expressValidator=require('express-validator');

require('dotenv').config();//allow us to use env variables

//import routes
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const braintreeRoutes=require('./routes/braintree');
const orderRoutes=require('./routes/order');


const app=express()//invoke express



//db connection
mongoose
.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
    
})
.then(()=>console.log("DB connected"));



//routes

//before import routes
// app.get('/',(req,res)=>{  //'/' is home page
//  res.send("hello from node ");
// });

//middlwares
app.use(morgan('dev'));
app.use(bodyParser.json());//get json data from request body clients set data
app.use(cookieParser());
//routes middleware
//after import routes
app.use(expressValidator());
app.use(cors());

app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",braintreeRoutes);
app.use("/api",orderRoutes);


const port=process.env.PORT || 8000 //process like document in web browser

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})