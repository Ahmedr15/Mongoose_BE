import {model,Schema} from "mongoose"
  const note_schema=new Schema({
    title:{
        type:String,
        require:true,
        validate:{
            validator:function (value) {
                return value!=value.toUpperCase();
            },
            message:"Your title must not contain only uppercase letters"
        }
    },
    content:{
        type:String,
        require:true
    },
    userID:{
        require:true,
        ref:"Users",
        type:Schema.Types.ObjectId
    }

  },{
    timestamps:true
  })

  export const Notes=model("Notes",note_schema)