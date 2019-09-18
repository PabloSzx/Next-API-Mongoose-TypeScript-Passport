import axios from "axios";
import { createContext, FC, useEffect, useState } from "react";

import { STATUS_NOT_HANDLED, VALIDATION_ERROR } from "../../../../const";
import { User } from "../../../../interfaces";

export const AuthContext = createContext<{
  user: User | null;
  login: (args: { email: string; password: string }) => Promise<User | string>;
  signUp: (args: { email: string; password: string }) => Promise<User | string>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}>({
  user: null,
  login: async () => STATUS_NOT_HANDLED,
  signUp: async () => STATUS_NOT_HANDLED,
  logout: async () => {},
  loading: true,
  error: null,
});

export const Auth: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    axios
      .post<User>("/api/currentUser")
      .then(({ status, data }) => {
        if (status === 200) {
          setUser(data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const resp = await axios.post<User | string>(
      "/api/login",
      {
        email,
        password,
      },
      {
        validateStatus: status => {
          switch (status) {
            case 200:
            case 401:
            case 422:
              return true;
            default:
              return false;
          }
        },
      }
    );

    switch (resp.status) {
      case 200:
      case 401:
        setLoading(false);
        if (typeof resp.data !== "string") {
          setUser(resp.data);
          setError(null);
        } else {
          setError(resp.data);
        }
        return resp.data;
      case 422:
        console.error(resp.data);
        throw new Error(VALIDATION_ERROR);
      default:
        throw new Error(STATUS_NOT_HANDLED);
    }
  };

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const resp = await axios.post<User | string>(
      "/api/signUp",
      {
        email,
        password,
      },
      {
        validateStatus: status => {
          switch (status) {
            case 200:
            case 401:
            case 422:
              return true;
            default:
              return false;
          }
        },
      }
    );

    switch (resp.status) {
      case 200:
      case 401:
        if (typeof resp.data !== "string") {
          setUser(resp.data);
          setError(null);
        } else {
          setError(resp.data);
        }

        setLoading(false);
        return resp.data;
      case 422:
        console.error(resp.data);
        throw new Error(VALIDATION_ERROR);
      default:
        throw new Error(STATUS_NOT_HANDLED);
    }
  };

  const logout = async () => {
    setLoading(true);
    await axios.post("/api/logout");
    setError(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signUp,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
