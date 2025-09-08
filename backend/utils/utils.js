import jwt from "jsonwebtoken"

const  generateToken=(userId)=>{
    return jwt.sign({
     userId

    },
   process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:"2d"
    }   
    )
}

export {generateToken}