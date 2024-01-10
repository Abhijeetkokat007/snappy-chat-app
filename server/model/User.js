import { Schema , model } from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
    email : {
        type : String,
        require : [true , "Password is Required"]
    },
    password : {
        type : String ,
        require : [true , "Password is Required"]
    },
    userName : {
        type : String ,
        require : [true , "Name is Required"]
    }
} , { timestamps : true});

UserSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECTECT_KEY,
        {
            expiresIn: "30days"
        }
        )
    }
    catch(err){
        console.error(err);
    }
};


const User = model("User" , UserSchema)

export default User