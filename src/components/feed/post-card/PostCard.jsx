import { useState } from "react";

import { filterCommentState } from "../../../util/filtering";

import PropTypes from "prop-types";

import PostHeader from "./PostHeader.jsx";

import PostBody from "./PostBody.jsx";

import PostCommentsFeed from "./PostCommentsFeed.jsx";

import PostControls from "./PostControls.jsx";

import PostSubRipple from "./PostSubRipple.jsx";

import "./PostCard.scss";

const PostCard = (props) => {
    const { id, title, content, userGoogleId, forumId, timestamp } = props;

    const [newComments, setNewComments] = useState([]);
    const handleNewComment = (commentObj) => {
        console.log("handling new comments");
        setNewComments([...newComments, commentObj]);
    };

    const filterNewCommentState = (commentId) => {
        filterCommentState(commentId, newComments, setNewComments);
    };

    // const filterCommentState = (commentId, commentsArr, setCommentState) => {
    //     const filteredComments = commentsArr.filter((comment) => comment.id !== commentId);
    //     if (filteredComments.length !== commentsArr.length) {
    //         setCommentState(filteredComments);
    //         return true;
    //     }

    //     return false;
    // };

    const [isDeleted, setisDeleted] = useState(false);
    const handleDeletePost = () => {
        setisDeleted(true);
    };

    return (
        <>
            {isDeleted ? (
                <></>
            ) : (
                <div className="post-card pc">
                    <div className="pc__post">
                        <PostHeader userGoogleId={userGoogleId} timestamp={timestamp} />

                        <PostSubRipple forumId={forumId} />

                        <div className="pc__title">
                            <h2>{title}</h2>
                        </div>

                        <PostBody content={content} />

                        <PostControls
                            postId={id}
                            userGoogleId={userGoogleId}
                            passHandleNewComment={handleNewComment}
                            passHandleDeletePost={handleDeletePost}
                        />
                    </div>
                    <div className="pc__comments">
                        <PostCommentsFeed
                            postId={id}
                            newComments={newComments}
                            passFilterNewCommentState={filterNewCommentState}
                        />
                    </div>
                </div>
            )}
        </>
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
