import { collection, getFirestore, getDocs, where, query } from "firebase/firestore/lite";

const getComments = async (setCommentState, userGoogleId = null, postId = null, offset = null) => {
    try {
        let userIdQuery = "";
        if (userGoogleId) {
            userIdQuery = where("userGoogleId", "==", userGoogleId);
        }

        let postIdQuery = "";
        if (postId) {
            console.log(postId);
            postIdQuery = where("postId", "==", postId);
        }

        if (offset) {
            console.log(offset);
        }

        const commentsQuery = query(
            collection(getFirestore(), "comments"),
            userIdQuery,
            postIdQuery
        );

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

export { getComments };
