import mongoose from "mongoose";
import 'dotenv/config'
import chalk from "chalk";
const url = process.env.MONGODB_URL
const connectToDb = async()=>{
    try{
        await mongoose.connect(url,{dbName:"ecommerce"})
        console.log(chalk.bgBlueBright.redBright("Connected to Mongodb"))
    }
    catch(error){
        console.error("error in connectimg to Db",error);
        
    }
}
export default connectToDb