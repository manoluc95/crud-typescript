import { Request, Response } from "express";
import { UserService, userServiceSingleton } from "../services/user.service";
import { HttpResponse } from "../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserController {
  constructor(
    public readonly userService: UserService = userServiceSingleton,
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async get(req: Request, res: Response) {
    try {
      const users = await this.userService.findAllUser();
      // this.httpResponse.Ok(res, users);
      res.render("user", { users, search: false });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getById(req: Request, res: Response) {
    let { id } = req.query;
    id = id?.toString() || "";

    try {
      const data = await this.userService.findUserById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe datos");
      }
      // return this.httpResponse.Ok(res, data);
      res.render("user/edit", {
        user: data,
      });
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async create(req: Request, res: Response) {
    try {
      await this.userService.createUser(req.body);
      // return this.httpResponse.Ok(res, data);
      res.redirect("/user");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async search(req: Request, res: Response) {
    let { search } = req.query;
    search = search?.toString() || "";

    try {
      const users = await this.userService.search(search);
      res.render("user", { users, search: search });
    } catch (err) {
      res.render("message", {
        message: `Error al buscar el usuario: ${search}`,
      });
    }
  }

  async update(req: Request, res: Response) {
    // const { id } = req.params;
    const { id } = req.body;

    try {
      const data: UpdateResult = await this.userService.updateUser(
        id,
        req.body,
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al actualizar");
      }
      res.redirect("/user");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
  async delete(req: Request, res: Response) {
    // const { id } = req.params;
    const { id } = req.body;

    try {
      const data: DeleteResult = await this.userService.deleteUser(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al eliminar");
      }
      // return this.httpResponse.Ok(res, data);
      res.redirect("/user");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getUserWithRelationById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserWithRelation(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
