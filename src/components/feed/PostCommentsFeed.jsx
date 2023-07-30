import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getComments } from "../../firebase/comment";

import "./PostCommentsFeed.scss";

/*

Fields needed
    - content (rename comment)
    - userGoogleId
    - timestamp
    - postId

- Add way to differentiate between no comments founds and loading
- Move any conditional rendering out of return and into method (NOT FOR HERE, BUT EVERYWHERE)

*/

const PostCommentsFeed = (props) => {
    const { postId } = props;

    console.log(postId);

    const [comments, setComment] = useState([]);
    useEffect(() => {
        getComments(setComment, null, postId);
    }, [postId]);

    const PostCommentsFeedContent = () => {
        if (comments.length > 0) {
            const commentItems = comments.map((comment) => {
                return <li key={comment.id}>{comment.content}</li>;
            });

            return commentItems;
        } else {
            return <>Loading</>;
        }
    };

    return <div className="pc__comments-feed">{PostCommentsFeedContent()}</div>;
};

PostCommentsFeed.propTypes = {
    postId: PropTypes.string,
};

export default PostCommentsFeed;
