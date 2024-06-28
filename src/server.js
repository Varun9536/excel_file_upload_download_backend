import database_connection from "./database/db_connection.js";
import { app } from "./middleware/api_middleware.js";




database_connection()
.then(()=>
{
    console.log("database connection method run successfully")
})
.catch((error)=>
{
    console.log("eroor occutred in database connection function" , error)
})





app.listen(process.env.PORT , ()=>
{
    console.log(`server is running on port ${process.env.PORT} `)
})