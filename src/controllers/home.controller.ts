import { Request, Response } from "express";

export class HomeController {
  constructor() {}

  async getIndex(req: Request, res: Response) {
    res.render("index");
  }
}
