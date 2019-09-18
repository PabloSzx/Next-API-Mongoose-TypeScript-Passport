import express from "express";

import { EMAIL_USED } from "../../src/const";
import { auth, common } from "../../src/server/middleware";
import { UserModel } from "../../src/server/models";
import { validation } from "../../src/server/utils/validation";

const app = express();

app.use(common);
app.use(auth);

app.use(
  validation({
    email: {
      customSanitizer: {
        options: text => {
          if (typeof text === "string") {
            text = text.trim();
          }
          return text;
        },
      },
      errorMessage: "Email must be a valid email",
      isEmail: true,
    },
    password: {
      customSanitizer: {
        options: text => {
          if (typeof text === "string") {
            text = text.trim();
          }
          return text;
        },
      },
      isLength: {
        errorMessage: "Password length must be between 3 and 100 characters",
        options: {
          min: 3,
          max: 100,
        },
      },
      isString: {
        errorMessage: "Password must be a valid string",
      },
    },
  }),
  async (req, res) => {
    const { email, password } = req.body as { email: string; password: string };
    let user = await UserModel.findOne({
      email,
    });
    if (!user) {
      user = await UserModel.create({
        email,
        password,
      });
      req.logIn(user, err => {
        if (err) {
          console.error("SignUp Login Error: ", err);
          return res.status(500).send(err.message ? err.message : err);
        }
        res.send(user);
      });
    }

    if (!res.headersSent) {
      res.status(401).send(EMAIL_USED);
    }
  }
);

export default app;
