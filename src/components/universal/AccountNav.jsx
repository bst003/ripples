import { useContext } from "react";

import UserContext from "./UserContext.jsx";

import { signInUser, signOutUser } from "../../firebase/authentication.js";

const AccountNav = () => {
  const user = useContext(UserContext);

  return (
    <div className="site-acount-nav">
      {user ? (
        <>
          {user.userName}
          <button type="button" onClick={signOutUser}>
            Sign Out
          </button>
        </>
      ) : (
        <button type="button" onClick={signInUser}>
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default AccountNav;
