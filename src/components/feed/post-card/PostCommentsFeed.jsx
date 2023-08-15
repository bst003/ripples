import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getComments } from "../../../firebase/comment";

import LoadingIcon from "../../misc/LoadingIcon.jsx";

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

    const [comments, setComment] = useState([]);
    useEffect(() => {
        setIsLoading(true);

        const getCommentsUpdateLoad = async () => {
            await getComments(setComment, null, postId);
            setIsLoading(false);
        };

        getCommentsUpdateLoad();
    }, [postId]);

    const appendNewComments = () => {
        if (newComments.length > 0) {
            const newCommentItems = newComments.map((comment, index) => {
                return <li key={index}>{comment.content}</li>;
            });

            const newCommentItemsRev = newCommentItems.reverse();

            return newCommentItemsRev;
        }
    };

    const PostCommentsFeedContent = () => {
        if (isLoading) {
            return <LoadingIcon />;
        } else {
            if (comments.length > 0) {
                const commentItems = comments.map((comment) => {
                    return <li key={comment.id}>{comment.content}</li>;
                });

                return commentItems;
            } else {
                return <>No comments found</>;
            }
        }
    };

    return (
        <div className="pc__comments-feed">
            {appendNewComments()}
            {PostCommentsFeedContent()}
        </div>
    );
};

PostCommentsFeed.propTypes = {
    postId: PropTypes.string,
    newComments: PropTypes.array,
};

export default PostCommentsFeed;
