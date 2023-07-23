import PropTypes from "prop-types";

import UserBadge from "../universal/UserBadge.jsx";

const PostHeader = (props) => {
    const { userGoogleId } = props;

    return (
        <div className="pc__header">
            t - {userGoogleId}
            <UserBadge userGoogleId={userGoogleId} isLink="true" />
        </div>
    );
};

PostHeader.propTypes = {
    userGoogleId: PropTypes.string,
};

export default PostHeader;
