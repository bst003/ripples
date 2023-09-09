import {
    addDoc,
    getDoc,
    deleteDoc,
    serverTimestamp,
    collection,
    doc,
    getFirestore,
    getDocs,
    limit,
    orderBy,
    startAt,
    where,
    query,
} from "firebase/firestore/lite";

const getPost = async (setPostState, postId = null) => {
    try {
        let postQuery = query(collection(getFirestore(), "posts"), where("__name__", "==", postId));

        const postQuerySnapshot = await getDocs(postQuery);

        const postObj = {};
        postQuerySnapshot.forEach((doc) => {
            postObj.id = doc.id;
            postObj.title = doc.data().title;
            postObj.content = doc.data().content;
            postObj.userGoogleId = doc.data().userGoogleId;
            postObj.forumId = doc.data().forumId;
            postObj.timestamp = doc.data().timestamp.toMillis();
        });

        setPostState(postObj);
    } catch (error) {
        console.log("Error fetching post: " + error);
    }
};

const setPostsQuery = async (params, trueCount) => {
    let postsQuery = query(
        collection(getFirestore(), "posts"),
        limit(trueCount),
        orderBy("timestamp", "desc")
    );

    if (params.userGoogleId) {
        postsQuery = query(
            collection(getFirestore(), "posts"),
            where("userGoogleId", "==", params.userGoogleId),
            limit(trueCount),
            orderBy("timestamp", "desc")
        );
    }

    if (params.subRippleId) {
        postsQuery = query(
            collection(getFirestore(), "posts"),
            where("forumId", "==", params.subRippleId),
            limit(trueCount),
            orderBy("timestamp", "desc")
        );
    }

    if (params.searchQuery) {
        postsQuery = query(
            collection(getFirestore(), "posts"),
            orderBy("title"),
            where("title", ">=", params.searchQuery),
            where("title", "<=", params.searchQuery + "\uf8ff"),
            limit(trueCount)
        );
    }

    if (params.currentPosts.length > 0 && params.loadMoreStartPointID != null) {
        const startingPointDocRef = await getDoc(
            doc(getFirestore(), "posts", params.loadMoreStartPointID)
        );

        postsQuery = query(
            collection(getFirestore(), "posts"),
            limit(trueCount),
            orderBy("timestamp", "desc"),
            startAt(startingPointDocRef)
        );

        if (params.userGoogleId) {
            postsQuery = query(
                collection(getFirestore(), "posts"),
                where("userGoogleId", "==", params.userGoogleId),
                limit(trueCount),
                orderBy("timestamp", "desc"),
                startAt(startingPointDocRef)
            );
        }

        if (params.subRippleId) {
            postsQuery = query(
                collection(getFirestore(), "posts"),
                where("forumId", "==", params.subRippleId),
                limit(trueCount),
                orderBy("timestamp", "desc"),
                startAt(startingPointDocRef)
            );
        }
    }

    return postsQuery;
};

const getPosts = async (params) => {
    let trueCount = params.count + Number(1);
    try {
        let postsQuery = await setPostsQuery(params, trueCount);

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

            postsArray.push(postObj);
        });

        if (postsArray.length === trueCount) {
            params.setLoadMoreStartPointID(postsArray[postsArray.length - 1].id);
            postsArray.pop();
        } else {
            params.setLoadMoreStartPointID(null);
        }

        let spreadPosts = [];
        if (params.currentPosts) {
            spreadPosts = params.currentPosts;
        }

        params.setPostState([...spreadPosts, ...postsArray]);
    } catch (error) {
        console.log("Error fetching posts: " + error);
    }
};

const deletePost = async (postId) => {
    try {
        await deleteDoc(doc(getFirestore(), "posts", postId));
        return true;
    } catch (error) {
        console.log("Error deleting post: " + error);
        return false;
    }
};

const submitPost = async (postObj) => {
    try {
        const newPost = await addDoc(collection(getFirestore(), "posts"), {
            ...postObj,
            timestamp: serverTimestamp(),
        });

        return newPost.id;
    } catch (error) {
        console.error("Error saving post to Firebase Database", error);

        return false;
    }
};

export { getPost, getPosts, deletePost, submitPost };
