import {
    addDoc,
    serverTimestamp,
    collection,
    getFirestore,
    getDocs,
    limit,
    orderBy,
    where,
    query,
} from "firebase/firestore/lite";

const getPost = async (setPostState, postId = null) => {
    try {
        let postQuery = query(collection(getFirestore(), "posts"), where("__name__", "==", postId));

        const postQuerySnapshot = await getDocs(postQuery);

        const postObj = {};
        postQuerySnapshot.forEach((doc) => {
            console.log(doc.data());

            postObj.id = doc.id;
            postObj.title = doc.data().title;
            postObj.content = doc.data().content;
            postObj.userGoogleId = doc.data().userGoogleId;
            postObj.forumId = doc.data().forumId;
            postObj.timestamp = doc.data().timestamp.toMillis();
        });

        console.log(postObj);

        setPostState(postObj);
    } catch (error) {
        console.log("Error fetching post: " + error);
    }
};

const getPosts = async (
    setPostState,
    userGoogleId = null,
    subRippleId = null,
    offset = null,
    count = 10
) => {
    try {
        let postsQuery = query(
            collection(getFirestore(), "posts"),
            limit(count),
            orderBy("timestamp", "desc")
        );

        if (userGoogleId) {
            // console.log(userGoogleId);
            postsQuery = query(
                collection(getFirestore(), "posts"),
                where("userGoogleId", "==", userGoogleId),
                limit(count),
                orderBy("timestamp", "desc")
            );
        }

        console.log("this is  atest");

        if (subRippleId) {
            console.log("we have a sub rippkle id");
            postsQuery = query(
                collection(getFirestore(), "posts"),
                where("forumId", "==", subRippleId),
                limit(count),
                orderBy("timestamp", "desc")
            );
        }

        if (offset) {
            console.log(offset);
        }

        console.log(postsQuery);

        const postsQuerySnapshot = await getDocs(postsQuery);

        console.log(postsQuerySnapshot._docs);

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
        const newPost = await addDoc(collection(getFirestore(), "posts"), {
            ...postObj,
            timestamp: serverTimestamp(),
        });

        console.log(newPost.id);

        // setSubmitted(true);
        return newPost.id;
    } catch (error) {
        console.error("Error saving post to Firebase Database", error);

        return false;
    }
};

export { getPost, getPosts, submitPost };
