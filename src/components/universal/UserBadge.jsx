import { useContext } from "react";

import UserContext from "./UserContext.jsx";

import "./UserBadge.scss";

const UserBadge = () => {
    const user = useContext(UserContext);

    return (
        <>
            {user ? (
                <div className="user-badge">
                    <img src={user.userPic} alt={user.userName + " profile pic"} />
                    <span>{user.userName}</span>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserBadge;
