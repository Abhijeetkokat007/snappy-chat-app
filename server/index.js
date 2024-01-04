import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json());

const connectDB = async () => {
    const  conne = await mongoose.connect(process.env.MONGODB_URI)
    if(conne){
        console.log(`mongoDB connected`);
    }
}

const PORT= 5050;
app.listen(PORT, () => {
    console.log(`server connected on ${PORT}`)
    connectDB()
})
