import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getComments } from "../../../firebase/comment";

import LoadingIcon from "../../misc/LoadingIcon.jsx";

import PostComment from "./PostComment";

import "./PostCommentsFeed.scss";

/*

Fields needed
    - content (rename comment)
    - userGoogleId
    - timestamp
    - postId

- Add way to differentiate between no comments founds and loading
- Move any conditional rendering out of return and into method (NOT FOR HERE, BUT EVERYWHERE)

APPLY LOGIC TO REMOVE NO POSTS FOUND TEXT WHEN NEW COMMENT IS ADDED

*/

const PostCommentsFeed = (props) => {
    const { postId, newComments } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [comments, setComments] = useState([]);

    // Stores the ID of the starting point of the next batch of loaded comments
    const [loadMoreStartPointID, setLoadMoreStartPointID] = useState(null);

    const constructCommentQueryParams = () => {
        console.log("constructing params now");
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

    const loadMoreComments = async () => {
        if (loadMoreStartPointID) {
            setIsLoading(true);
            await getComments(constructQueryParams());
            setIsLoading(false);
        }
    };
    useEffect(() => {
        setIsLoading(true);

        const getCommentsUpdateLoad = async () => {
            await getComments(setComments, null, postId);
            setIsLoading(false);
        };

        getCommentsUpdateLoad();
    }, [postId]);

    const handleDeleteComment = (commentId) => {
        console.log("this has reached the comment feed");

        const filteredComments = comments.filter((comment) => comment.id !== commentId);
        if (filteredComments.length !== comments.length) {
            setComments(filteredComments);
        } else {
            // pass commentId to PostCard and remove from newComments
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

    const noCommentsContent = () => {
        if (!comments.length && !newComments.length) {
            return <p>No comments found</p>;
        }
    };

    const PostCommentsFeedContent = () => {
        if (isLoading) {
            return <LoadingIcon />;
        } else {
            return (
                <>
                    {appendNewComments()}
                    {loadedCommentsContent()}
                    {noCommentsContent()}
                </>
            );
        }
    };

    return <div className="pc__comments-feed">{PostCommentsFeedContent()}</div>;
};

PostCommentsFeed.propTypes = {
    postId: PropTypes.string,
    newComments: PropTypes.array,
};

export default PostCommentsFeed;
