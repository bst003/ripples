import {
    addDoc,
    serverTimestamp,
    collection,
    getFirestore,
    getDocs,
    limit,
    where,
    query,
} from "firebase/firestore/lite";

const getPosts = async (
    setPostState,
    userGoogleId = null,
    subRippleId = null,
    offset = null,
    count = 10
) => {
    try {
        let postsQuery = query(collection(getFirestore(), "posts"), limit(count));

        if (userGoogleId) {
            // console.log(userGoogleId);
            postsQuery = query(
                collection(getFirestore(), "posts"),
                where("userGoogleId", "==", userGoogleId),
                limit(count)
            );
        }

        console.log("this is  atest");

        if (subRippleId) {
            console.log("we have a sub rippkle id");
            postsQuery = query(
                collection(getFirestore(), "posts"),
                where("forumId", "==", subRippleId),
                limit(count)
            );
        }

        if (offset) {
            console.log(offset);
        }

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

const submitPost = async (postObj) => {
    console.log("test");
    try {
        await addDoc(collection(getFirestore(), "posts"), {
            ...postObj,
            timestamp: serverTimestamp(),
        });

        // setSubmitted(true);
    } catch (error) {
        console.error("Error saving post to Firebase Database", error);
    }
};

export { getPosts, submitPost };
