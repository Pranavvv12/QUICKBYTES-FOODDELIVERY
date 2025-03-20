import mongoose from "mongoose";


export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://newUser:newPassword@cluster0.r50ov.mongodb.net/Quickbytes').then(()=>console.log("DB CONNECTED"));
}
