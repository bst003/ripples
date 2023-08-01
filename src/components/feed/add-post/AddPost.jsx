import AddPostModal from "./AddPostModal";

const AddPost = () => {
    return (
        <>
            <div className="add-post-contain">
                <button className="btn-el" type="button">
                    Add Post
                </button>
            </div>
            <AddPostModal modalIsOpen={false} closeModal={() => console.log("test")} />
        </>
    );
};

export default AddPost;
