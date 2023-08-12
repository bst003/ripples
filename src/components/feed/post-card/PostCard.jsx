import PropTypes from "prop-types";

import PostHeader from "./PostHeader.jsx";

import PostBody from "./PostBody.jsx";

import PostCommentsFeed from "./PostCommentsFeed.jsx";

import PostControls from "./PostControls.jsx";

import PostSubRipple from "./PostSubRipple.jsx";

import "./PostCard.scss";

const PostCard = (props) => {
    const { id, title, content, userGoogleId, forumId, timestamp } = props;

    return (
        <div className="post-card pc">
            <div className="pc__post">
                <PostHeader userGoogleId={userGoogleId} timestamp={timestamp} />

                <PostSubRipple forumId={forumId} />

                <div className="pc__title">
                    <h2>{title}</h2>
                </div>

                <PostBody content={content} />

                <PostControls id={id} userGoogleId={userGoogleId} />
            </div>
            <div className="pc__comments">
                <PostCommentsFeed postId={id} />
            </div>
        </div>
    );
};

PostCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    userGoogleId: PropTypes.string,
    forumId: PropTypes.string,
    timestamp: PropTypes.number,
};

export default PostCard;
