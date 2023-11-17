import passport from "passport";

import { BaseRouter } from "./router";
import { HomeController } from "../controllers/home.controller";
import { Request, Response } from "express";
import { Helpers } from "../config/helper";

export class HomeRouter extends BaseRouter<HomeController> {
  constructor() {
    super(HomeController);
  }

  routes(): void {
    this.router.get("/", (req, res) => {
      this.controller.getIndex(req, res);
    });

    this.router.get("/signup", Helpers.isNotLoggedIn, (req, res) => {
      res.render("auth/signup");
    });

    this.router.post(
      "/signup",
      passport.authenticate("local.signup", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true,
      }),
    );

    this.router.get("/signin", Helpers.isNotLoggedIn, (req, res) => {
      res.render("auth/signin");
    });

    this.router.post("/signin", (req: Request, res: Response, next) => {
      passport.authenticate("local.signin", {
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true,
      })(req, res, next);
    });

    // Antes de dirigir a profile verificamos si el usuario esta logeado
    this.router.get("/profile", Helpers.isLoggedIn, (req, res) => {
      res.render("auth/profile");
    });

    this.router.get("/logout", (req, res) => {
      req.logout(function (err) {
        if (err) {
          req.flash("message", `Ocurrió un error: ${err}`);
          res.redirect("/");
        }
        req.flash("message", "Gracias por usar nuestra app");
        res.redirect("/signin");
      });
    });
  }
}
