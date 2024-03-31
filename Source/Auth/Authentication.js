import bcrypt from 'bcrypt'
import jwt , {decode} from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const Salt = 10;  //suffle alphaphetic


// Create password Hash Create
const createHash =  async (data) => {
    const salt = await bcrypt.genSaltSync(Salt);
    const hash = await bcrypt.hashSync(data, salt);
    return hash

}


// Login Compare Password
const getHash = async (data,hash) => {
    return bcrypt.compareSync(data, hash)
}


// Token Generate
const createToken = async (payload) => {
    let token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIR
    });
    return(token) ;
}



const decodeToken = async (token) => {
    return await jwt.decode(token)
}



// MiddleWare Function 
const authenticate = async (req,res,next) => {
    const token = req?.headers?.authorization?.split(" ")[1]
   
    if(token){
       
        let payload = await  decodeToken(token)
        let currentime = +new Date()
        
        if(Math.floor(currentime/1000) < payload.exp){
            next()
        }
        else{
            res.status(402).send({
                message : "Session expired"
            })
        }
    }
    else{
        res.status(402).send({
            message:"Unauthorized Access"
        })
    }
}


// Only Admin can used
const adminAuth = async (req,res,next) => {
    const token = req?.headers?.authorization?.split(" ")[1]
   
    if(token){
       
        let payload = await  decodeToken(token)
        let currentime = +new Date()
        
        if(payload.role === "User"){
            next()
        }
        else{
            res.status(402).send({
                message : "Only admins Are allowed"
            })
        }
    }
    else{
        res.status(402).send({
            message:"Unauthorized Access"
        })
    }
}





export default {
    createHash,
    getHash,
    createToken,
    authenticate ,
    adminAuth
}
