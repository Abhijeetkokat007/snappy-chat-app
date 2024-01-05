import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./model/User.js";
import md5 from "md5";

dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (conn) {
            console.log("Connected to MongoDB 😊");
        }
    } catch (err) {
        console.log(err.message);
    }
};

app.post("/api/signup", async (req, res) => {
    const { userName, email, password } = req.body;

    const newUser = new User({
        userName,
        email,
        password:md5(password),
    });

    try {
        const saveUser = await newUser.save();
        res.status(201).json({
            success: true,
            data: saveUser,
            message: "Signup Successful",
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});

app.post("/api/login", async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "invalid email and password"
        })
    }
       
            const checkuser = await User.findOne({email,  password:md5(password)});
            if (checkuser) {
                res.status(201).json({
                    success: true,
                    data: checkuser,
                    message: "login succesfull"
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "invalid data"
                })
            }
          
}
)



const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

connectDB();
