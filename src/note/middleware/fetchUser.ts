import * as bcrypt from "bcrypt"
import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomRequest } from "../interface/user.interface";
import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken"
@Injectable()
export class fetchUserMiddleWare implements  NestMiddleware{
    use(req : CustomRequest, res:Response,next:NextFunction){
     let token =req.header("auth-token")
     if(!token){
        throw new Error("Invalid Token ")
     }
     const JWT_SEC = `honeyisagoodboy`;
     let data =jwt.verify(token,JWT_SEC)

     req.user=data.user;
     next()
    }
}