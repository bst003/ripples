import Modal from "react-modal";

import PropTypes from "prop-types";

const AddPostModal = (props) => {
    const { modalIsOpen, closeModal, children } = props;

    Modal.setAppElement("#root");

    // used to prevent excessive amounts of modal in DOM
    if (!modalIsOpen) {
        return null;
    }

    return (
        <Modal
            closeTimeoutMS={200}
            className="ripples-modal add-post-modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add Post Modal"
        >
            <button className="ripples-modal__close btn-icon" type="button" onClick={closeModal}>
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

export default AddPostModal;
