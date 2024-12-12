import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter=express.Router();

//image storage
const storage = multer.diskStorage({
    destination: "uploads", // The directory where files will be saved
    filename: (req, file, cb) => { // 'file' is passed here as an argument
        cb(null, `${Date.now()}-${file.originalname}`); // Use 'file.originalname' correctly
    }
});

const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter