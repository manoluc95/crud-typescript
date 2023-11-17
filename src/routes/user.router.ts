import { BaseRouter } from "./router";
import { UserController } from "../controllers/user.controller";
import { Helpers } from "../config/helper";

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get("/", Helpers.isLoggedIn, (req, res) =>
      this.controller.get(req, res),
    );

    this.router.get("/edit", Helpers.isLoggedIn, (req, res) =>
      this.controller.getById(req, res),
    );
    this.router.get("/add", Helpers.isLoggedIn, (req, res) => {
      res.render("user/add");
    });
    this.router.post("/create", Helpers.isLoggedIn, (req, res) =>
      this.controller.create(req, res),
    );

    this.router.get("/search", Helpers.isLoggedIn, (req, res) => {
      this.controller.search(req, res);
    });

    this.router.post("/update", Helpers.isLoggedIn, (req, res) =>
      this.controller.update(req, res),
    );
    this.router.post("/delete", Helpers.isLoggedIn, (req, res) =>
      this.controller.delete(req, res),
    );
    this.router.get("/userRel/:id", Helpers.isLoggedIn, (req, res) =>
      this.controller.getUserWithRelationById(req, res),
    );
  }
}
