import express from "express";

import { auth, common } from "../../src/server/middleware";

const app = express();

app.use(common);
app.use(auth);

app.use((req, res) => {
  if (req.user && req.isAuthenticated()) {
    return res.send(req.user);
  }
  res.sendStatus(204);
});

export default app;
