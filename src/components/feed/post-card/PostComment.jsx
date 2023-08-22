import { useContext, useState } from "react";

import PropTypes from "prop-types";

import UserContext from "../../universal/UserContext";

import UserBadge from "../../universal/UserBadge";

import TimeStamp from "../TimeStamp";

import DeleteModal from "./DeleteModal";

import { deleteComment } from "../../../firebase/comment";

import "./PostComment.scss";

const PostComment = (props) => {
    const { id, content, userGoogleId, timestamp } = props;

    const userData = useContext(UserContext);

    const [isDeleted, setisDeleted] = useState(false);
    // const handleDeletePost = () => {
    //     setisDeleted(true);
    // };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleDeleteComment = () => {
        console.log("comment is deleted");
    };

    const postContentComment = () => {
        if (!isDeleted) {
            return (
                <div className="pc__comment">
                    <div className="header">
                        <UserBadge userGoogleId={userGoogleId} isLink={true} />
                        <TimeStamp timestamp={timestamp} />
                        {userData && userData.googleId === userGoogleId && (
                            <>
                                <button type="button" onClick={() => setModalIsOpen(true)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                                <DeleteModal
                                    entityId={id}
                                    modalIsOpen={modalIsOpen}
                                    closeModal={closeModal}
                                    entityName="comment"
                                    deleteEntity={deleteComment}
                                    passHandleDelete={handleDeleteComment}
                                />
                            </>
                        )}
                    </div>
                    {content}
                </div>
            );
        }
    };

    return <>{postContentComment()}</>;
};

PostComment.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    userGoogleId: PropTypes.string,
    forumId: PropTypes.string,
    timestamp: PropTypes.number,
};

export default PostComment;