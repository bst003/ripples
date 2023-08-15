import Modal from "react-modal";

import PropTypes from "prop-types";

const PostDeleteModal = (props) => {
    const { modalIsOpen, closeModal, children } = props;

    Modal.setAppElement("#root");

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
            {children}
        </Modal>
    );
};

AddPostModal.propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element,
};

export default PostDeleteModal;
