import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import { UserRouter } from "./routes/user.router";
import { HomeRouter } from "./routes/home.router";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv("PORT");

  constructor() {
    super();

    // Middleware
    this.app.use(
      session({
        // Configuro el guardado de seción
        secret: this.getEnvironment("SECRET") ?? "ASDFasdf1234",
        resave: false,
        saveUninitialized: false,
      }),
    );
    this.app.use(flash());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    require("./config/passport");

    this.app.use((req, res, next) => {
      this.app.locals.message = req.flash("message");
      this.app.locals.success = req.flash("success");

      this.app.locals.login_user = req.user;
      next();
    });

    // Establece EJS como el motor de vistas
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "..", "views"));
    this.app.use(express.static(path.join(__dirname, "..", "public")));

    // ruter
    this.app.use("/", new HomeRouter().router);
    this.app.use("/user", new UserRouter().router);

    this.dbConnect();
    this.listen();
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => {
        console.log("Connect db Success");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port " + this.port);
    });
  }
}

new ServerBootstrap();
