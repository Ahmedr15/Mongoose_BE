import {model,Schema} from "mongoose";

const user_schema= new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        min:18,
        max:60
    }
})

export const Users=model("Users",user_schema)