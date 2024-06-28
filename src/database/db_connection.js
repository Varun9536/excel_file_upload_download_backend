import mongoose from "mongoose"

const database_connection = async()=>
    {
        try {
            let database_connect  = await mongoose.connect(`${process.env.MONGO_URI}`)
            console.log(database_connect.connection.host)
        } catch (error) {
            console.log("error" , error)
        }
    }


    export default database_connection