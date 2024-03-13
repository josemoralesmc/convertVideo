import { user } from "./types/userController";
import { createHash, isValidatePassword } from "../utils/bycript";
import { Request, Response } from "express";
import { UsersService } from "../services/session.service";
import { generateToken } from "../utils/jwt";
const { v4: uuidv4 } = require('uuid');
import { parseName, parseEmail, verifyUser } from "../utils/controller-verify";
export class UserController {
  async login(req: Request, res: Response): Promise<any> {
    const { mail, password } = req.body;
    const usersService = UsersService.getInstance();
    try {
      const user = await usersService.getUser({ mail, password });
      const id = user.Items[0].id.S;
      if (!isValidatePassword(password, user.Items[0].password.S)) {
        return res.send("Contraseña incorrecta");
      }
      const token = generateToken(mail, id);
      res.cookie("Token", token);
      return res.json({ success: true, message: "Login successes", data: token });
    } catch (error) {
      return res.json({ success: false, message: "failed to login", data: error });
    }
  }

  async register(req: Request, res: Response): Promise<any> {
    const { mail, password, name } = req.body;
    const idGenerate = uuidv4();
    const passwordHash = createHash(password);

    const newUser: user = {
      name: parseName(name),
      mail: parseEmail(mail),
      password: passwordHash,
      id: idGenerate,
    };
    const usersService = UsersService.getInstance();
    try {
      const user = await usersService.getUser({ mail });
      console.log(user.Items);
      

      const response = verifyUser(user);
      
      await usersService.postUser(newUser);
      return res.json({
        response
      });
    } catch (error) {
      console.log(error);
      
      return res.json({ success: false, message: "Registration failed", data: error });
    }
  }
}
