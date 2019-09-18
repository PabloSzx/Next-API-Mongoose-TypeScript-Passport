import { NextApiRequest, NextApiResponse } from "next";

import { UserModel } from "../../src/server/models";

const users = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.send(await UserModel.find());
};

export default users;
