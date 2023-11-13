import { BaseRouter } from "./router";
import { HomeController } from "../controllers/home.controller";

export class HomeRouter extends BaseRouter<HomeController> {
  constructor() {
    super(HomeController);
  }

  routes(): void {
    this.router.get("/", (req, res) => {
      this.controller.getIndex(req, res)
    });

  }
}
