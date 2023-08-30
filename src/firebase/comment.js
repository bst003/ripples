import {
    collection,
    getFirestore,
    doc,
    addDoc,
    deleteDoc,
    getDoc,
    getDocs,
    where,
    query,
    limit,
    orderBy,
    startAt,
    serverTimestamp,
} from "firebase/firestore/lite";

const setCommentsQuery = async (params, trueCount) => {
    let commentsQuery = query(
        collection(getFirestore(), "comments"),
        where("postId", "==", params.postId),
        limit(trueCount),
        orderBy("timestamp", "desc")
    );

    if (params.currentPosts.length > 0) {
        const startingPointDocRef = await getDoc(
            doc(getFirestore(), "comments", params.loadMoreStartPointID)
        );

        commentsQuery = query(
            collection(getFirestore(), "comments"),
            where("postId", "==", params.postId),
            limit(trueCount),
            orderBy("timestamp", "desc"),
            startAt(startingPointDocRef)
        );
    }

    return commentsQuery;
};

const getCommentsAlt = async (params) => {
    let trueCount = params.count + Number(1);
    try {
        const commentsQuery = setCommentsQuery(params, trueCount);

        const commentsQuerySnapshot = await getDocs(commentsQuery);

        const commentsArray = [];
        commentsQuerySnapshot.forEach((doc) => {
            const commentObj = {
                id: doc.id,
                content: doc.data().content,
                userGoogleId: doc.data().userGoogleId,
                timestamp: doc.data().timestamp.toMillis(),
            };

            console.log(commentObj);

            commentsArray.push(commentObj);
        });

        params.setCommentState(commentsArray);

        if (commentsArray.length === trueCount) {
            console.log("overlow, show load more");
            // params.setLoadMore(true);
            params.setLoadMoreStartPointID(commentsArray[commentsArray.length - 1].id);
            commentsArray.pop();
        } else {
            params.setLoadMoreStartPointID(null);
        }

        let spreadComments = [];
        if (params.currentComments) {
            spreadComments = params.currentComments;
        }

        params.setPostState([...spreadComments, ...commentsArray]);
    } catch (error) {
        console.log("Error fetching comments: " + error);
    }
};

const getComments = async (setCommentState, userGoogleId = null, postId = null, offset = null) => {
    try {
        let commentsQuery;

        if (userGoogleId) {
            commentsQuery = query(
                collection(getFirestore(), "comments"),
                where("userGoogleId", "==", userGoogleId)
            );
        }

        if (postId) {
            commentsQuery = query(
                collection(getFirestore(), "comments"),
                where("postId", "==", postId)
            );
        }

        if (offset) {
            console.log(offset);
        }

        // const commentsQuery = query(
        //     collection(getFirestore(), "comments"),
        //     userIdQuery,
        //     postIdQuery
        // );

        const commentsQuerySnapshot = await getDocs(commentsQuery);

        const commentsArray = [];
        commentsQuerySnapshot.forEach((doc) => {
            const commentObj = {
                id: doc.id,
                content: doc.data().content,
                userGoogleId: doc.data().userGoogleId,
                timestamp: doc.data().timestamp.toMillis(),
            };

            console.log(commentObj);

            commentsArray.push(commentObj);
        });

        setCommentState(commentsArray);
    } catch (error) {
        console.log("Error fetching posts: " + error);
    }
};

const submitComment = async (commentObj) => {
    console.log("test");
    try {
        const newComment = await addDoc(collection(getFirestore(), "comments"), {
            ...commentObj,
            timestamp: serverTimestamp(),
        });

        console.log(newComment.id);

        // setSubmitted(true);
        return newComment.id;
    } catch (error) {
        console.error("Error saving comment to Firebase Database", error);

        return false;
    }
};

const deleteComment = async (commentId) => {
    console.log(commentId);
    try {
        const deletedDoc = await deleteDoc(doc(getFirestore(), "comments", commentId));
        console.log(deletedDoc);
        return true;
    } catch (error) {
        console.log("Error deleting comment: " + error);
        return false;
    }
};

export { getComments, getCommentsAlt, submitComment, deleteComment };
