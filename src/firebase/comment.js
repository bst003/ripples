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

    if (params.currentComments.length > 0) {
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

const getComments = async (params) => {
    let trueCount = params.count + Number(1);
    try {
        const commentsQuery = await setCommentsQuery(params, trueCount);

        const commentsQuerySnapshot = await getDocs(commentsQuery);

        const commentsArray = [];
        commentsQuerySnapshot.forEach((doc) => {
            const commentObj = {
                id: doc.id,
                content: doc.data().content,
                userGoogleId: doc.data().userGoogleId,
                timestamp: doc.data().timestamp.toMillis(),
            };

            commentsArray.push(commentObj);
        });

        if (commentsArray.length === trueCount) {
            params.setLoadMoreStartPointID(commentsArray[commentsArray.length - 1].id);
            commentsArray.pop();
        } else {
            params.setLoadMoreStartPointID(null);
        }

        let spreadComments = [];
        if (params.currentComments) {
            spreadComments = params.currentComments;
        }

        params.setCommentState([...spreadComments, ...commentsArray]);
    } catch (error) {
        console.log("Error fetching comments: " + error);
    }
};

const submitComment = async (commentObj) => {
    try {
        const newComment = await addDoc(collection(getFirestore(), "comments"), {
            ...commentObj,
            timestamp: serverTimestamp(),
        });

        return newComment.id;
    } catch (error) {
        console.error("Error saving comment to Firebase Database", error);

        return false;
    }
};

const deleteComment = async (commentId) => {
    try {
        await deleteDoc(doc(getFirestore(), "comments", commentId));
        return true;
    } catch (error) {
        console.log("Error deleting comment: " + error);
        return false;
    }
};

export { getComments, submitComment, deleteComment };
