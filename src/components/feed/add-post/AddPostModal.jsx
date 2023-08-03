import Modal from "react-modal";

import PropTypes from "prop-types";

const AddPostModal = (props) => {
    const { modalIsOpen, closeModal } = props;

    Modal.setAppElement("#root");

    return (
        <Modal
            closeTimeoutMS={200}
            className="ripples-modal add-post-modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Game Alert Modal"
        >
            <button className="gameModal__close" type="button" onClick={closeModal}>
                <span className="screen-reader-text">close</span>
                <i className="fas fa-times"></i>
            </button>
            Form will go here
        </Modal>
    );
};

AddPostModal.propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default AddPostModal;