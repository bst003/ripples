import {
    collection,
    getFirestore,
    addDoc,
    getDocs,
    where,
    query,
    serverTimestamp,
} from "firebase/firestore/lite";

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

export { getComments, submitComment };
