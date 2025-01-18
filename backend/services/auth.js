import  jwt from "jsonwebtoken"

const screate='nilesh$2389@'

function setUser(user){
    return jwt.sign({_id:user._id,email:user.email,fullname:user.fullname},screate)
}

function getUser(token){
    if(!token) return null
    return jwt.verify(token,screate)
}

export {setUser,getUser}