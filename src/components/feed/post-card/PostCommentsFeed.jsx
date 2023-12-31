import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getComments } from "../../../firebase/comment";

import { filterCommentState } from "../../../util/filtering";

import LoadingIcon from "../../misc/LoadingIcon.jsx";

import LoadMore from "../LoadMore";

import PostComment from "./PostComment";

import "./PostCommentsFeed.scss";

const PostCommentsFeed = (props) => {
    const { postId, newComments, passFilterNewCommentState } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [comments, setComments] = useState([]);

    // Stores the ID of the starting point of the next batch of loaded comments
    const [loadMoreStartPointID, setLoadMoreStartPointID] = useState(null);

    // Query Related Methods and Effects
    // ---------------------------------------------------
    const constructCommentQueryParams = () => {
        const queryParams = {
            setCommentState: setComments,
            setLoadMoreStartPointID: setLoadMoreStartPointID,
            loadMoreStartPointID: loadMoreStartPointID,
            postId: postId,
            count: 3,
        };

        queryParams.currentComments = [];
        if (comments) {
            queryParams.currentComments = comments;
        }

        return queryParams;
    };

    // Effects
    useEffect(() => {
        setIsLoading(true);

        const getCommentsUpdateLoad = async () => {
            await getComments(constructCommentQueryParams());
            setIsLoading(false);
        };

        getCommentsUpdateLoad();
    }, [postId]);

    // Load More Functions
    // ---------------------------------------------------
    const loadMoreComments = async () => {
        if (loadMoreStartPointID) {
            setIsLoading(true);
            await getComments(constructCommentQueryParams());
            setIsLoading(false);
        }
    };
    const loadMoreContent = () => {
        if (loadMoreStartPointID) {
            return (
                <>
                    {isLoading && comments.length > 0 && <LoadingIcon />}
                    {!isLoading && <LoadMore triggerLoadMore={loadMoreComments} isSmall={true} />}
                </>
            );
        }
    };

    // Single Comment Contents and Methods
    // ---------------------------------------------------
    const handleDeleteComment = (commentId) => {
        console.log("this has reached the comment feed");

        if (!filterCommentState(commentId, comments, setComments)) {
            console.log("comment didn't filter, run in PostCard");
            passFilterNewCommentState(commentId);
        }
    };

    const appendNewComments = () => {
        if (newComments.length > 0) {
            const newCommentItems = newComments.map((comment, index) => {
                return (
                    <PostComment
                        key={index}
                        id={comment.id}
                        content={comment.content}
                        userGoogleId={comment.userGoogleId}
                        timestamp={comment.timestamp}
                        passHandleDelete={handleDeleteComment}
                    />
                );
            });

            const newCommentItemsRev = newCommentItems.reverse();

            return newCommentItemsRev;
        }
    };

    const loadedCommentsContent = () => {
        if (comments.length > 0) {
            const commentItems = comments.map((comment) => {
                return (
                    <PostComment
                        key={comment.id}
                        id={comment.id}
                        content={comment.content}
                        userGoogleId={comment.userGoogleId}
                        timestamp={comment.timestamp}
                        passHandleDelete={handleDeleteComment}
                    />
                );
            });

            return commentItems;
        }
    };

    // Non-Single Comment Content Methods
    // ---------------------------------------------------
    const noCommentsContent = () => {
        if (!comments.length && !newComments.length) {
            return <p>No comments found</p>;
        }
    };

    const PostCommentsFeedContent = () => {
        if (isLoading && comments.length <= 1) {
            return <LoadingIcon />;
        } else {
            return (
                <>
                    {appendNewComments()}
                    {loadedCommentsContent()}
                    {noCommentsContent()}
                    {loadMoreContent()}
                </>
            );
        }
    };

    return <div className="pc__comments-feed">{PostCommentsFeedContent()}</div>;
};

PostCommentsFeed.propTypes = {
    postId: PropTypes.string,
    newComments: PropTypes.array,
    passFilterNewCommentState: PropTypes.func,
};

export default PostCommentsFeed;
