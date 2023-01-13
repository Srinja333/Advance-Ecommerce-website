const express=require('express')
const router=express.Router()//new router object
const{ create,categoryById,read,update,remove,list }=require('../controllers/category');
const{ requireSignin, isAuth, isAdmin }=require('../controllers/auth');
//const {userSignupValidator}= require('../validator');
const{ userById }=require('../controllers/user');

router.get("/category/:categoryId",read);

router.post("/category/create/:userId",requireSignin,isAuth,isAdmin,create);//sir told requireSignin,isAuth,isAdmin, as mw and create as only method

router.put("/category/:categoryId/:userId",requireSignin,isAuth,isAdmin,update);

router.delete("/category/:categoryId/:userId",requireSignin,isAuth,isAdmin,remove);

router.get("/categories",list);

router.param("categoryId",categoryById);

router.param("userId",userById);


module.exports=router;