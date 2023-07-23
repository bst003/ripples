import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { setUserDataAsState } from "../../firebase/user.js";

import UserContext from "./UserContext.jsx";

import "./UserBadge.scss";

const UserBadge = (props) => {
    const { userGoogleId, isLink } = props;

    const userData = useContext(UserContext);

    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!userGoogleId) {
            setUser(userData);
        } else {
            setUserDataAsState(setUser, userGoogleId);
        }
    }, []);

    const renderBadgeContents = () => {
        const contents = (
            <div className="user-badge">
                <img
                    src={user.userPic}
                    alt={user.userName + " profile pic"}
                    referrerPolicy="no-referrer"
                />
                <span>{user.userName}</span>
            </div>
        );

        if (isLink) {
            return <Link to={"/profile/" + user.userName}>{contents}</Link>;
        }

        return contents;
    };

    return <>{user ? renderBadgeContents() : <></>}</>;
};

UserBadge.propTypes = {
    userGoogleId: PropTypes.string,
    isLink: PropTypes.bool,
};

export default UserBadge;
