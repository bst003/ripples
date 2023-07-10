import { useContext } from "react";

import { Link } from "react-router-dom";

import UserContext from "./UserContext.jsx";

import { signInUser, signOutUser } from "../../firebase/authentication.js";

const AccountNav = () => {
    const user = useContext(UserContext);

    const toggleNav = () => {};

    return (
        <div className="site-acount-nav">
            {user ? (
                <div className="account-nav__contain">
                    <button className="account-nav__toggle" type="button" onClick={toggleNav}>
                        {user.userName}
                    </button>

                    <ul>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                        <li>
                            <button type="button" onClick={signOutUser}>
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                <button type="button" onClick={signInUser}>
                    Sign In with Google
                </button>
            )}
        </div>
    );
};

export default AccountNav;
