import { collection, getFirestore, getDocs, limit, where, query } from "firebase/firestore/lite";

const getPosts = async (
    setPostState,
    userGoogleId = null,
    subRippleId = null,
    offset = null,
    count = 10
) => {
    try {
        let postsQuery;

        if (userGoogleId) {
            // console.log(userGoogleId);
            postsQuery = query(
                collection(getFirestore(), "posts"),
                where("userGoogleId", "==", userGoogleId),
                limit(count)
            );
        }

        if (subRippleId) {
            postsQuery = query(
                collection(getFirestore(), "posts"),
                where("forumId", "==", subRippleId),
                limit(count)
            );
        }

        if (offset) {
            console.log(offset);
        }

        postsQuery = query(collection(getFirestore(), "posts"), limit(10));

        const postsQuerySnapshot = await getDocs(postsQuery);

        const postsArray = [];
        postsQuerySnapshot.forEach((doc) => {
            const postObj = {
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content,
                userGoogleId: doc.data().userGoogleId,
                forumId: doc.data().forumId,
                timestamp: doc.data().timestamp.toMillis(),
            };

            console.log(postObj);

            postsArray.push(postObj);
        });

        setPostState(postsArray);
    } catch (error) {
        console.log("Error fetching posts: " + error);
    }
};

export { getPosts };
