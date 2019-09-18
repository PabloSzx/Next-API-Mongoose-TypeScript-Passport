import axios from "axios";
import { NextPage } from "next";

import { User } from "../src/interfaces";

const Index: NextPage<{ users: User[] }> = ({ users }) => {
  return <div>{JSON.stringify(users, null, 4)}</div>;
};

Index.getInitialProps = async () => {
  await axios.post("http://localhost:3000/api/createUser");

  return {
    users: (await axios.post<User[]>("http://localhost:3000/api/users")).data,
  };
};

export default Index;
