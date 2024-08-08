import express, { NextFunction, Request, Response } from "express";
import {
  activateUser,
  loginUser,
  logoutUser,
  registerUser,
  forgotPassword,
  updateAccessToken,
  getUserInfo,
  socialAuth,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
});
userRouter.post("/register", registerUser);
userRouter.post("/activateUser", activateUser);
userRouter.post("/login-user", loginUser);
userRouter.get("/logout-user", isAuthenticated, logoutUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.get("/refreshtoken", updateAccessToken);
userRouter.get("/userinfo", isAuthenticated,getUserInfo);
userRouter.post("/socialauth", socialAuth);
export default userRouter;
