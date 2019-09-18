import { NextPage } from "next";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { isEmail, isLength } from "validator";

import { AuthContext } from "../src/client/components/Auth/Context";

const LoginPage: NextPage = () => {
  const { login, error, user, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      Router.push("/");
    }
  }, [user]);

  const valid = isEmail(email) && isLength(password, { min: 3, max: 100 });

  if (loading || user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {error && (
        <div>
          <label>{error}</label>
        </div>
      )}

      <form
        onSubmit={async e => {
          e.preventDefault();
          login({ email, password });
        }}
      >
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <button disabled={!valid} type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
