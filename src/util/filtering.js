const filterCommentState = (commentId, commentsArr, setCommentState) => {
    const filteredComments = commentsArr.filter((comment) => comment.id !== commentId);
    if (filteredComments.length !== commentsArr.length) {
        setCommentState(filteredComments);
        return true;
    }

    return false;
};

export { filterCommentState };
