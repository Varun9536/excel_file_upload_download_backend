import express from "express"
import { excel_file, sent_excel, sent_single_file } from "../controllers/excelController.js"


const excelRoutes = express.Router()

excelRoutes.post("/file" , excel_file )
excelRoutes.get("/getfile" , sent_excel)
excelRoutes.post("/onefile" , sent_single_file)

export default excelRoutes