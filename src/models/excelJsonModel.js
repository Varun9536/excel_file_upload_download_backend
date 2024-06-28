import mongoose from "mongoose";

const excelSchema = new mongoose.Schema({
    data : Object ,
    name : String
} , {timestamps : true})

const excelModel = mongoose.model("excelToJson" , excelSchema)

export default excelModel