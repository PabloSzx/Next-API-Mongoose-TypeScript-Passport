import { NextApiRequest, NextApiResponse } from "next";

import { UserModel } from "../../src/server/models";

const createUser = async (_req: NextApiRequest, res: NextApiResponse) => {
  const user = await UserModel.create({
    name: "pablo",
  });

  res.send(user);
};

export default createUser;
