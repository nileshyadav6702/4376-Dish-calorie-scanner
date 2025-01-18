import { Router } from "express";
import usermodel from "../model/user.model.js";

let userrouter=Router()

userrouter.post('/signup',async (req,res)=>{
    try{
        const {name,email,password}=req.body
        let user=await usermodel.create({
            fullname:name,
            email,
            password
        })
        res.json(user)
    }
    catch(error){
        return res.json({error:error})
    }
})
userrouter.post('/signin',async (req,res)=>{
    try{
        const {email,password}=req.body
        let token =await usermodel.matchPassword(email, password);
        return res.cookie("uid", token).json({msg:'login success'});
    }
    catch(error){
        return res.json({error:error})
    }
})

userrouter.get('/logout',(req,res)=>{
    res.clearCookie('uid')
    return res.render('home')
})



export default userrouter