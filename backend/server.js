import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"



const app=express()
const port= 4000

//middleware
app.use(express.json())
app.use(cors())

//dbconnection
connectDB();

//api
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API WORKING");
})

app.listen(port,()=>{
    console.log(`Server Stared on http://localhost:${port}`)
})

//mongodb+srv://userquickbytes:user123@cluster0.r50ov.mongodb.net/?