import { signInUser, signOutUser } from "../../firebase/authentication.js";

const AccountNav = () => {
  return (
    <div className="site-acount-nav">
      <button type="button" onClick={signInUser}>
        Sign In
      </button>

      <button type="button" onClick={signOutUser}>
        Sign Out
      </button>
    </div>
  );
};

export default AccountNav;
