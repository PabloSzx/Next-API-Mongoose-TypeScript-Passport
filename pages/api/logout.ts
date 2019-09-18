import express from "express";

import { auth, common } from "../../src/server/middleware";

const app = express();

app.use(common);
app.use(auth);

app.use(async (req, res) => {
  req.logOut();
  if (req.session) {
    req.session.destroy &&
      req.session.destroy(err => {
        if (err) console.error("SessionDestroyError: ", err);
      });
  }
  res.clearCookie("connect.sid");
  res.sendStatus(200);
});

export default app;
