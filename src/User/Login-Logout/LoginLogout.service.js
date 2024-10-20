import  jwt  from "jsonwebtoken"
import { jwtSecretCode } from "../constants.js";
import { LoginDao } from "../../Dao/LoginDao.js";


export const loginService=async(body)=>{

    const userDetails = await LoginDao(body.userName,body.type)
    if (userDetails){
        if (userDetails.password === body.password){
            const token = await jwt.sign({ userCode: userDetails.userCode, email: userDetails.email, userType: userDetails.userType, loginDetails: userDetails }, jwtSecretCode, { expiresIn: '30d' });
            return {
                Accesstoken: token,
                expiresIn:"30 days"
            }
        } else {
            throw new Error(`Entered Wrong password`);
        }

    }else{
        throw new Error(`User not Found`);
    }
}