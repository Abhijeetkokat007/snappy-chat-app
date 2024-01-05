import { Schema , model } from "mongoose";

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

const User = model("User" , UserSchema)

export default User