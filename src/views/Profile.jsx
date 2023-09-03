import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import Feed from "../components/feed/Feed";

import LoadingIcon from "../components/misc/LoadingIcon";

import { getUserIdByName } from "../firebase/user";

const Profile = () => {
    let { username } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        const getForumUpdateLoad = async () => {
            const returnedUserId = await getUserIdByName(username);
            setUserId(returnedUserId);
            setIsLoading(false);
        };

        getForumUpdateLoad();
    }, [username]);

    const mainContent = () => {
        if (isLoading || !userId) {
            return <LoadingIcon />;
        } else {
            return <Feed userGoogleId={userId} />;
        }
    };

    return (
        <div>
            <h1 className="center-text">Posts by: {username}</h1>
            {mainContent()}
        </div>
    );
};

export default Profile;
