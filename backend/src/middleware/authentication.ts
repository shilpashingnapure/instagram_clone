import { config } from "dotenv";
import { Request , Response , NextFunction } from "express";
import jwt from 'jsonwebtoken';
config();

export interface CustomRequest extends Request {
    user?: any; // Use a more specific type if you have one
  }
  

export function authenticate(req : CustomRequest  , res : Response  , next : NextFunction ){
    const token = req.cookies.token
    console.log(req.cookies);
    if(!token){
        return res.status(401).json({ message : 'No token provided'});
    }

    jwt.verify(token , process.env.JWT_SECRET_KEY , (err , user) => {
        if(err){
            return res.status(401).json({ message : 'Invalid token'})
        }

        req.user = user;
        next();

    })

}