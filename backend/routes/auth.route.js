const express = require("express");


const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/auth.model");

userRouter.post("/register",async(req,res)=>{
    const {username,email,password,profile} = req.body;
    const exist = await UserModel.findOne({email:email});
    if(exist){
        res.send("User Already Exists");
    }
    else {
        try {
            bcrypt.hash(password,4,async(err,hash)=>{
             if(err){
                 res.send(err.message)
             }else {
                 const user = new UserModel({username,email,password:hash,profile});
                 await user.save();
                 res.send("user has been registered");
             }
            }) 
         } catch (error) {
             console.log(error);
             res.status(201).send(error)
         }
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({_id:user[0]._id},"userdata")
                    res.status(200).send({token,user});
                }else{
                    res.send(err)
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }
})

userRouter.patch("/:id/reset",async(req,res)=>{
    let id = req.params.id;
    const {password} = req.body;
    try {
        await UserModel.findByIdAndUpdate({_id:id},{password:password});
        res.send("password has been updated")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

// update user

userRouter.patch("/update/:id",async(req,res)=>{
    let id = req.params.id;
    let payload = req.body;
    try {
        let users = await UserModel.findOne({_id:id});
        Object.assign(users,payload);
        await users.save();
        res.send("user has been updated");
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});

// get user
userRouter.get("/get/:id",async(req,res)=>{
    let id = req.params.id;
    try {
        let userpro = await UserModel.findOne({_id:id});
        res.send(userpro);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports={
    userRouter
}