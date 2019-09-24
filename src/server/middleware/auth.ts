import MongoStore from "connect-mongo";
import { Router } from "express";
import expressSession from "express-session";
import mongoose, { Document } from "mongoose";
import passport from "passport";

import { WRONG_INFO } from "../../const";
import { User } from "../../interfaces";
import { UserModel } from "../models";

export const auth = Router();

auth.use(
  expressSession({
    store: new (MongoStore(expressSession))({
      mongooseConnection: mongoose.connection,
    }),
    secret:
      process.env.COOKIE_KEY || "please_use_cookie_key_environment_variable",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 86400000, secure: "auto" },
  })
);

auth.use(passport.initialize());
auth.use(passport.session());

passport.serializeUser<User & Document, string>((user, cb) => {
  if (user) cb(null, user._id.toString());
  else cb(WRONG_INFO);
});

passport.deserializeUser<User | null, string>(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    if (user) {
      done(null, user);
    } else {
      done(null, null);
    }
  } catch (err) {
    done(err.message || err);
    console.error("deserializeUserError: ", err);
  }
});

export const requireAuth = Router();
requireAuth.use(auth, (req, res, next) => {
  if (req.user && req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(403);
});
