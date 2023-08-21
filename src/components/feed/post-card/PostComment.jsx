import { useContext, useState } from "react";

import PropTypes from "prop-types";

import UserContext from "../../universal/UserContext";

import UserBadge from "../../universal/UserBadge";

import TimeStamp from "../TimeStamp";

import "./PostComment.scss";

const PostComment = (props) => {
    const { id, content, userGoogleId, timestamp } = props;

    const userData = useContext(UserContext);

    const [isDeleted, setisDeleted] = useState(false);
    // const handleDeletePost = () => {
    //     setisDeleted(true);
    // };

    const postContentComment = () => {
        if (!isDeleted) {
            return (
                <div className="pc__comment">
                    <div className="header">
                        <UserBadge userGoogleId={userGoogleId} isLink={true} />
                        <TimeStamp timestamp={timestamp} />
                        {userData.googleId === userGoogleId && <>delete</>}
                    </div>
                    {content}
                </div>
            );
        }
    };

    return <>{postContentComment()}</>;
};

PostComment.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    userGoogleId: PropTypes.string,
    forumId: PropTypes.string,
    timestamp: PropTypes.number,
};

export default PostComment;
