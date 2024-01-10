import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./model/User.js";
import md5 from "md5";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());

// socket ----------------->
const io = new Server(5002, {
    cors: {
        origin: '*',
    },
})

io.on('connection', (socket) => {
    console.log("user connected");

    socket.on('message', (data) => {
        console.log(data);
    })
})

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


app.get('/sendMessage', (req, res) => {
    const { message } = req.query;
    io.emit('receive', message);

    res.status(200).json({ message: 'message send' });
})


app.post("/api/signup", async (req, res) => {
    const { userName, email, password } = req.body;

    const newUser = new User({
        userName,
        email,
        password: md5(password),
    });

    try {
        const saveUser = await newUser.save();
        res.status(201).json({
            success: true,
            data: saveUser,
            message: "Resgistration Successful",
            token: await newUser.generateToken(),
            userId: newUser._id.toString(),
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "invalid email and password"
        })
    }

    const checkuser = await User.findOne({ email, password: md5(password) });
    if (checkuser) {
       
        if (checkuser) {
            jwt.sign({ checkuser },
                process.env.JWT_SECTECT_KEY,
                {
                    expiresIn: "30h"
                },
                (err, token) => {

                    if (err) {
                        res.status(404).json({
                            success: false,
                            message: "Something went wrong , please try After Some time.",
                        })
                    }
                    res.status(201).json({
                        success: true,
                        data: checkuser,
                        message: "login succesfull",
                        token: token,
                    })
                }
            )


        }
        else {
            res.status(404).json({
                success: false,
                message: "No User Found"
            })
        }



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
