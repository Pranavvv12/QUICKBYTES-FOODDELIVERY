import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import validator from "validator";


const loginUser=async(req,res)=>{
        const {email,password}=req.body;
        try{
            const user=await userModel.findOne({email});

            if(!user){
                return res.json({success:false,message:"User does not Exist"});
            }
            //comparing the user entered password and the password in database
            const isMatch=await bycrypt.compare(password,user.password)
            if(!isMatch){
                return res.json({success:false,message:"Invalid Credentials"});
            }
            const token=createToken(user._id);
            res.json({success:"true",token});

        }catch(error){
            console.log(error);
            res.json({success:"false",message:"Error"});
        }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    try{
        //checking user is already exixting or not
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User Already Exists"})
        }
        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a Valid Email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Password should be at least 8 characters long"})
        }
        //hashing password
        const salt=await bycrypt.genSalt(10)
        const  hashedPassword=await bycrypt.hash(password,salt)

        //create new user
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        //save the user in database
        const user=await newUser.save()
        const token=createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser};