import PropTypes from "prop-types";

import TimeStamp from "./TimeStamp.jsx";

import UserBadge from "../universal/UserBadge.jsx";

import "./PostHeader.scss";

const PostHeader = (props) => {
    const { userGoogleId, timestamp } = props;

    return (
        <div className="pc__header pc__base">
            <UserBadge userGoogleId={userGoogleId} isLink={true} />

            <TimeStamp timestamp={timestamp} />
        </div>
    );
};

PostHeader.propTypes = {
    userGoogleId: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
};

export default PostHeader;
