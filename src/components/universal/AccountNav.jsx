import { useContext, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import UserBadge from "./UserBadge.jsx";
import UserContext from "./UserContext.jsx";

import "./AccountNav.scss";

import { signInUser, signOutUser } from "../../firebase/authentication.js";

const AccountNav = () => {
    const user = useContext(UserContext);

    const { pathname } = useLocation();

    useEffect(() => {
        const nav = document.querySelector(".account-nav__navigation");
        if (nav && nav.classList.contains("active")) {
            nav.classList.remove("active");
        }
    }, [pathname]);

    const toggleNav = (e) => {
        e.preventDefault();

        const toggle = e.currentTarget;
        const navContain = toggle.parentElement;

        const nav = navContain.querySelector(".account-nav__navigation");
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
        } else {
            nav.classList.add("active");
        }
    };

    return (
        <div className="acount-nav">
            {user ? (
                <div className="account-nav__contain">
                    <button className="account-nav__toggle" type="button" onClick={toggleNav}>
                        <UserBadge isLink={null} />
                    </button>

                    <nav className="account-nav__navigation">
                        <ul>
                            <li>
                                <Link to={"/profile/" + user.userName}>Profile</Link>
                            </li>
                            <li>
                                <button type="button" onClick={signOutUser}>
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            ) : (
                <button className="account-nav__signin btn-el" type="button" onClick={signInUser}>
                    Google Sign In
                </button>
            )}
        </div>
    );
};

export default AccountNav;
