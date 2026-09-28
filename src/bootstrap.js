import exp from "express"
import chalk from "chalk"
import { router as user_router,routes as user_routes } from "./Modules/Controllers/user.controller.js"
import { router as note_router,routes as note_routes } from "./Modules/Controllers/note.controller.js"
import { test_DB_connection } from "./DB/db.connection.js"
export const Bootstrap = async () => {
    test_DB_connection()
    const mongo_app = exp()
    mongo_app.use(exp.json())
    mongo_app.use(user_routes.base, user_router)
    mongo_app.use(note_routes.base, note_router)
    

    mongo_app.use((err,req,res,next)=>{
        const statuscode=err.cause?.statuscode||500
        res.status(statuscode).json({
            message:err.message
        })
    })
    mongo_app.listen(2000, () => {
        console.log(chalk.greenBright("Server is running"))
    })
}