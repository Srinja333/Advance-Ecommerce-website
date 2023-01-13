const express=require('express')
const router=express.Router()//new router object
const {userSignupValidator}= require('../validator');
const{ signup,signin,signout,requireSignin}=require('../controllers/auth');

// router.get("/",(req,res)=>{
//     res.send("hello from node js");
// })

//after require sayHi
router.post("/signup",userSignupValidator,signup);
router.post("/signin",signin);
router.get("/signout",signout);

// router.get("/hello",requireSignin,(req,res)=>{
//     res.send("hello there");
// });
module.exports=router;