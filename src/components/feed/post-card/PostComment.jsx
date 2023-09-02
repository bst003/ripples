import { useContext, useState } from "react";

import PropTypes from "prop-types";

import UserContext from "../../universal/UserContext";

import UserBadge from "../../universal/UserBadge";

import TimeStamp from "../TimeStamp";

import DeleteModal from "./DeleteModal";

import { deleteComment } from "../../../firebase/comment";

import { formatContentIntoPara } from "../../../util/formatting";

import "./PostComment.scss";

/*
Should isDeleted be removed from PostComment since the comments and 
newComments state is updated aad the comment will disappear anyway?
*/

const PostComment = (props) => {
    const { id, content, userGoogleId, timestamp, passHandleDelete } = props;

    console.log(content);

    // const formatWhiteSpace = () => {
    //     const contentArr = content.split("\n");
    //     console.log(contentArr);
    //     return contentArr;
    // };

    // console.log(formatWhiteSpace());

    // const formattedContents = () => {
    //     const test = formatWhiteSpace();
    //     const newContent = test.map((para, index) => {
    //         if (para !== "") {
    //             return <p key={index}>{para}</p>;
    //         }
    //     });

    //     return newContent;
    // };

    const userData = useContext(UserContext);

    const [isDeleted, setIsDeleted] = useState(false);
    const handleDeleteComment = () => {
        console.log("comment is deleted");
        setIsDeleted(true);
        passHandleDelete(id);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
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
                    <div className="pc__comment-body">{formatContentIntoPara(content)}</div>
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
    passHandleDelete: PropTypes.func,
};

export default PostComment;
