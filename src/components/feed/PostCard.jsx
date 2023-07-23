import PropTypes from "prop-types";

import PostHeader from "./PostHeader.jsx";

import "./PostCard.scss";

const PostCard = (props) => {
    const { id, title, content, userGoogleId, timestamp } = props;

    return (
        <div className="post-card pc">
            <div className="pc__post">
                <PostHeader userGoogleId={userGoogleId} timestamp={timestamp} />
                {id}
                {title}
                {content}
                {userGoogleId}
                {timestamp}
            </div>
            <div className="pc__comments"> comments here</div>
        </div>
    );
};

PostCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    userGoogleId: PropTypes.string,
    timestamp: PropTypes.number,
};

export default PostCard;
