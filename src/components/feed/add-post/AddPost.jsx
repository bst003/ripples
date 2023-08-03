import { useState } from "react";

import AddPostForm from "./AddPostForm";
import AddPostModal from "./AddPostModal";

const AddPost = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        console.log("close");
        setModalIsOpen(false);
    };

    return (
        <>
            <div className="add-post-contain">
                <button className="btn-el" onClick={() => setModalIsOpen(true)} type="button">
                    Add Post
                </button>
            </div>
            <AddPostModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
                <AddPostForm />
            </AddPostModal>
        </>
    );
};

export default AddPost;
