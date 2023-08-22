import Modal from "react-modal";

import PropTypes from "prop-types";

const DeleteModal = (props) => {
    const { entityId, modalIsOpen, closeModal, entityName, deleteEntity, passHandleDelete } = props;

    Modal.setAppElement("#root");

    const triggerDeletePost = async () => {
        const entityDeleted = await deleteEntity(entityId);
        if (entityDeleted) {
            passHandleDelete();
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
            <p>Are you sure you want to delete this {entityName}?</p>
            <button className="btn-el" onClick={triggerDeletePost}>
                yes
            </button>
        </Modal>
    );
};

DeleteModal.propTypes = {
    entityId: PropTypes.string.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    entityName: PropTypes.string.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    passHandleDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
