
import mongoose from "mongoose"

const connectDb=async()=>{
    try {

        const conn= await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("Database connectionn successful")
        
    } catch (error) {

        console.log("error1 connecting to database")
        throw  error
        
    }
}

export {connectDb}