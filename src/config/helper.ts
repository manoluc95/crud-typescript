import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

export class Helpers {
  constructor() {}

  static isLoggedIn(req: Request, res: Response, next: NextFunction) {
    // Usamos un método de passport que devuelve un boolean si hay un usuario logeado
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/signin");
  }

  static isNotLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/profile");
  }

  static async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async matchPassword(password: string, savedPassword: string) {
    try {
      return await bcrypt.compare(password, savedPassword);
    } catch (error) {
      console.log(error);
    }
  }
}
