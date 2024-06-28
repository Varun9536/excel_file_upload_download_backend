import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import excelRoutes from "../routes/excelRoute.js"
import multer from "multer"


// env file for db connection string and port
dotenv.config()

// exptress app
export const app = express()


// multer to save file in public folder
const storage = multer.diskStorage({
    destination : function(req , file , cb)
    {
        return cb(null , "./src/public")
    } ,

    filename : function(req , file , cb)
    {
        return cb(null , `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

// remove cors
app.use(cors())


// use of morgan to show api request and time
app.use(morgan("dev"))


// parse json data from body
app.use(express.json())


// routes of api_controllers
app.use("/v1" , upload.single("file") ,  excelRoutes)

