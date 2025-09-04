import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({

  name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    }

})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password= await bcrypt.hash(this.password,10);
    next();


})

userSchema.methods.generateAccessToken=async function(){
    return jwt.sign({
        _id:this._id,
        email:this.email

    },
   process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:"2d"
    }


)
}

export const User=mongoose.model("User",userSchema)