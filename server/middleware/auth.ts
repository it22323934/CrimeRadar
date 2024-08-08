import { Request,Response,NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
//Authenticated User
export const isAuthenticated=CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    const accessToken=req.cookies.accessToken;
    if(!accessToken){
        return next(new ErrorHandler("Please Login first to access this resource",400));
    }
    const decoded=jwt.verify(accessToken,process.env.ACCESS_TOKEN as string) as JwtPayload;
    if(!decoded){
        return next(new ErrorHandler("Access Token is Not Valid",400));
    }
    const user=await redis.get(decoded.id);
    if(!user){
        return next(new ErrorHandler("User Not Found",400));
    }
    req.user=JSON.parse(user);
    next();
}
)

export const authorizeRoles=(...roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user?.role || "")){
            return next(new ErrorHandler(`Role (${req.user?.role || ""}) is not allowed to access this resource`,403));
        }
    }
}