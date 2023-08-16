import Modal from "react-modal";

import PropTypes from "prop-types";

import { deletePost } from "../../../firebase/post";

const PostDeleteModal = (props) => {
    const { postId, modalIsOpen, closeModal, passHandleDeletePost } = props;

    Modal.setAppElement("#root");

    const triggerDeletePost = async () => {
        const postDeleted = await deletePost(postId);
        if (postDeleted) {
            console.log("the post has been deleted, remove from content");
            passHandleDeletePost();
            closeModal();
        }
    };

    return (
        <Modal
            closeTimeoutMS={200}
            className="ripples-modal delete-post-modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Delete Post Modal"
        >
            <button className="ripples-modal__close" type="button" onClick={closeModal}>
                <span className="screen-reader-text">close</span>
                <i className="fas fa-times"></i>
            </button>
            <p>Are you sure you want to delete this post?</p>
            <button className="btn-el" onClick={triggerDeletePost}>
                yes
            </button>
        </Modal>
    );
};

PostDeleteModal.propTypes = {
    postId: PropTypes.string.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    passHandleDeletePost: PropTypes.func.isRequired,
};

export default PostDeleteModal;
