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

    /*
    The below methods are related to toggling the new comment form 
    and controlling passing new comment data back to PostCard
    */
    const [addComment, setAddComment] = useState(false);
    const toggleForm = () => {
        setAddComment(!addComment);
    };

    const handleNewComment = (commentObj) => {
        passHandleNewComment(commentObj);
    };

    const addCommentContent = () => {
        if (addComment) {
            return (
                <PostAddCommentForm
                    id={postId}
                    userGoogleId={userGoogleId}
                    toggleCommentForm={toggleForm}
                    passHandleNewComment={handleNewComment}
                />
            );
        }
    };

    /*
    The below methods are used to toggle the post delete modal,
    controlling the delete button content and passing deleted 
    post methods back to PostCard
    */
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

    /*
    The below method is used to control which controls appear based
    on user login status
    */
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

    return (
        <>
            <div className="pc__controls">{controlContent()}</div>
            {addCommentContent()}
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
