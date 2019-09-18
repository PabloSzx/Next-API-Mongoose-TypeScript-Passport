import express from "express";

import { common, requireAuth } from "../../src/server/middleware";
import { UserModel } from "../../src/server/models";

const app = express();

app.use(common);

app.use(requireAuth, async (_req, res) => {
  res.send(await UserModel.find());
});

export default app;
