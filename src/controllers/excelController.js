import excelToJson from "convert-excel-to-json"
import excelModel from "../models/excelJsonModel.js";
import path from "path"
import { promisify } from "util";
import fs from "fs"

const unlinkAsync = promisify(fs.unlink)



// save excel file data and delete old data from mongodb and public folder
export const excel_file = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ "result": "no file found" })
    }

    try {
        const result = excelToJson({
            sourceFile: `src/public/${req.file.filename}`
        });

        if (!result) {
            return res.status(400).json({ "result": "no file found" })
        }

        let old_data = await excelModel.find({})

        // delete old data from mongodb
        let delete_data = await excelModel.deleteMany({})

        // delete old files from backend prublic folder
        if (old_data.length > 0) {
            try {
                await unlinkAsync(path.join(path.resolve(), "src/public", `${old_data[0].name}`))
            } catch (error) {
                console.log("error", error)
            }

        }

        console.log(old_data)


        const data = await excelModel.create({ data: result, name: req.file.filename })
        // console.log(req.file, result, data)

        return res.json({ "result": result })
    } catch (error) {
        console.log("error", error)

        return res.status(500).json({ "result": "internal server error" })
    }

}







// get all files from server and and send to user screen
export const sent_excel = async (req, res) => {
    try {
        let all_files = await excelModel.find({})

        if (all_files.length <= 0) {

            return res.status(400).json({ "result": "no files is found" })
        }

        // console.log(all_files)

        return res.status(200).json({ data: all_files })

    } catch (error) {
        console.log("error", error)

        return res.status(500).json({ result: "internal server error" })
    }


}





// send excel file data to user and user will download it . user will send id of file

export const sent_single_file = async (req, res) => {

    try {
        let { id } = req.body

        if (!id) {
            return res.status(400).json({ "result": "no file found" })
        }

        let file = await excelModel.find({ _id: id })
        // console.log(file[0].name)

        if (file.length <= 0) {
            return res.status(400).json({ "result": "no file found" })
        }

        if (!file[0].name) {
            return res.status(400).json({ "result": "no file found" })
        }

        return res.sendFile(path.join(path.resolve(), "src/public", `${file[0].name}`))


    } catch (error) {

        console.log("error", error)

        return res.status(500).json({ result: "internal server error" })

    }


}