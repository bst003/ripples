import { useContext, useState } from "react";

import UserContext from "./../../universal/UserContext";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import PostAddCommentForm from "./PostAddCommentForm";

import PostDeleteModal from "./PostDeleteModal";

import "./PostControls.scss";

/*

Options needed
    - Delete post (if logged in)
    - Comment
    - Single Post View

Pass in user ID of person who made post.

Compare to user context 

*/

const PostControls = (props) => {
    const { postId, userGoogleId, passHandleNewComment, passHandleDeletePost } = props;

    const userData = useContext(UserContext);

    const [addComment, setAddComment] = useState(false);
    const toggleForm = () => {
        setAddComment(!addComment);
    };

    // const triggerDeletePost = () => {
    //     // add alert modal
    //     if (confirm("delete post")) {
    //         deletePost(id);
    //     }
    // };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleDeletePost = () => {
        passHandleDeletePost();
    };

    const deleteButtonContent = () => {
        if (userData.googleId === userGoogleId) {
            return (
                <>
                    <button
                        className="control-button"
                        type="button"
                        onClick={() => setModalIsOpen(true)}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <PostDeleteModal
                        postId={postId}
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        passHandleDeletePost={handleDeletePost}
                    />
                </>
            );
        }
    };

    const controlContent = () => {
        if (userData) {
            return (
                <>
                    <button className="control-button" type="button" onClick={toggleForm}>
                        <i className="fa-solid fa-comment"></i>
                    </button>
                    <Link className="control-button" to={"/post/" + postId}>
                        <i className="fa-solid fa-expand"></i>
                    </Link>
                    {deleteButtonContent()}
                </>
            );
        } else {
            return (
                <Link className="control-button" to={"/post/" + postId}>
                    <i className="fa-solid fa-expand"></i>
                </Link>
            );
        }
    };

    const handleNewComment = (commentObj) => {
        console.log("Post Controls --------");
        console.log(commentObj);
        passHandleNewComment(commentObj);
    };

    return (
        <>
            <div className="pc__controls">{controlContent()}</div>
            {addComment ? (
                <PostAddCommentForm
                    id={postId}
                    userGoogleId={userGoogleId}
                    toggleCommentForm={toggleForm}
                    passHandleNewComment={handleNewComment}
                />
            ) : (
                ""
            )}
        </>
    );
};

PostControls.propTypes = {
    postId: PropTypes.string,
    userGoogleId: PropTypes.string,
    passHandleNewComment: PropTypes.func,
    passHandleDeletePost: PropTypes.func,
};

export default PostControls;
