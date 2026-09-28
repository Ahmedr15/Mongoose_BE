import mongoose from "mongoose"
import chalk from "chalk"
export const test_DB_connection=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/mongoose_practice",{
            serverSelectionTimeoutMS:2000
        }
        )
        console.log(chalk.green("DB connected successfully"))
    } catch (error) {
        //throw new Error(error.message)
        console.log(chalk.redBright("Connection failed with DB"))
    }
}