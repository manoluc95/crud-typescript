import passport from "passport";
import * as passportLocal from "passport-local";

import { UserService, userServiceSingleton } from "../services/user.service";
import { Helpers } from "./helper";
import { RoleType, UserDTO } from "../dto/user.dto";
import { Request } from "express";

const LocalStrategy = passportLocal.Strategy;

// MÉTODO PARA INGRESAR
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req: Request, username, password, done) => {
      try {
        const userService: UserService = userServiceSingleton;

        // Buscamos en la BD el usuario
        const user = await userService.findByUsername(username);

        if (user) {
          // Verifico si la contraseñas coinciden, devuelve un boolean
          const validPassword = await Helpers.matchPassword(
            password,
            user.password,
          );

          if (validPassword) {
            done(null, user);
          } else {
            req.flash("message", "Usuario o contraseña incorrectos");
            done(null, false);
          }
        } else {
          req.flash("message", "Usuario o contraseña incorrectos");
          return done(null, false);
        }
      } catch (err: any) {
        console.log(err.toString());
        req.flash("message", err.toString());
        return done(null, false);
      }
    },
  ),
);

// MÉTODO PARA REGISTRARSE
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req: Request, username, password, done) => {
      const { email, name, city, state, lastname } = req.body;

      const validUser = new UserDTO();

      validUser.name = name;
      validUser.username = username;
      validUser.lastname = lastname;
      validUser.email = email;
      validUser.password = password;
      validUser.city = city;
      validUser.state = state;
      validUser.role = RoleType.USER;

      // Verifico que la contraseña sea valida
      if (
        !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password) ||
        password.length < 8
      ) {
        req.flash("message", "Contraseña no valida");
        return done(null, false);
      }

      // Almaceno el usuario en la BD
      const userService: UserService = userServiceSingleton;
      try {
        await userService.createUser(validUser).then((result) => {
          req.flash("message", "Usuario creado con éxito");
          return done(null, result);
        });
      } catch (err: any) {
        console.log(err.toString());
        req.flash("message", err.toString());
        return done(null, false);
      }
    },
  ),
);

passport.serializeUser((usr: any, done) => {
  done(null, usr.id);
});

passport.deserializeUser(async (id: string, done) => {
  const userService: UserService = userServiceSingleton;
  const result = await userService.findUserById(id);
  done(null, result);
});
