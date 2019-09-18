import Link from "next/link";
import { FC, useContext } from "react";

import { AuthContext } from "../Auth/Context";

const Navigation: FC = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }
  return (
    <nav>
      {user ? (
        <>
          <p>Welcome {user.email}</p>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login" passHref>
            <button>Login</button>
          </Link>
          <Link href="/signUp" passHref>
            <button>Sign Up</button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
