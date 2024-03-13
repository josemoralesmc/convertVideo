import { Request, Response } from "express";
import { refreshToken } from "../utils/jwt";
export class UserToken {
    async token(req: Request, res: Response): Promise<any> {
      try {
        const token = req.headers.authorization?.split(" ")[1];
  
        const newToken = refreshToken(token);
        if (newToken) {
          res.cookie("Token", newToken);
        }
  
        return { success: true, message: "Token accepted" };
      } catch (error) {
        return { success: false, message: "Failed token" };
      }
    }
  }
  