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

// const getPosts = async (
//     setPostState,
//     userGoogleId = null,
//     subRippleId = null,
//     offset = null,
//     count = 10
// ) => {
//     let trueCount = count + Number(1);
//     console.log(`count is ${trueCount}`);
//     try {
//         let postsQuery = query(
//             collection(getFirestore(), "posts"),
//             limit(trueCount),
//             orderBy("timestamp", "desc")
//         );

//         if (userGoogleId) {
//             // console.log(userGoogleId);
//             postsQuery = query(
//                 collection(getFirestore(), "posts"),
//                 where("userGoogleId", "==", userGoogleId),
//                 limit(trueCount),
//                 orderBy("timestamp", "desc")
//             );
//         }

//         if (subRippleId) {
//             console.log("we have a sub rippkle id");
//             postsQuery = query(
//                 collection(getFirestore(), "posts"),
//                 where("forumId", "==", subRippleId),
//                 limit(trueCount),
//                 orderBy("timestamp", "desc")
//             );
//         }

//         if (offset) {
//             let trueOffset = offset + Number(1);
//             // console.log()
//         }

//         console.log(postsQuery);

//         const postsQuerySnapshot = await getDocs(postsQuery);

//         console.log(postsQuerySnapshot._docs);

//         const postsArray = [];
//         postsQuerySnapshot.forEach((doc) => {
//             const postObj = {
//                 id: doc.id,
//                 title: doc.data().title,
//                 content: doc.data().content,
//                 userGoogleId: doc.data().userGoogleId,
//                 forumId: doc.data().forumId,
//                 timestamp: doc.data().timestamp.toMillis(),
//             };

//             console.log(postObj);

//             postsArray.push(postObj);
//         });

//         if (postsArray.length === trueCount) {
//             console.log("overlow, show load more");
//         }

//         console.log(postsArray);

//         setPostState(postsArray);
//     } catch (error) {
//         console.log("Error fetching posts: " + error);
//     }
// };

const getPosts = async (params) => {
    let trueCount = params.count + Number(1);
    console.log(`count is ${trueCount}`);
    try {
        let postsQuery = query(
            collection(getFirestore(), "posts"),
            limit(trueCount),
            orderBy("timestamp", "desc")
        );

        if (params.userGoogleId) {
            // console.log(userGoogleId);
            postsQuery = query(
                collection(getFirestore(), "posts"),
                where("userGoogleId", "==", params.userGoogleId),
                limit(trueCount),
                orderBy("timestamp", "desc")
            );
        }

        if (params.subRippleId) {
            console.log("we have a sub rippkle id");
            postsQuery = query(
                collection(getFirestore(), "posts"),
                where("forumId", "==", params.subRippleId),
                limit(trueCount),
                orderBy("timestamp", "desc")
            );
        }

        if (params.currentPosts.length > 0) {
            // const startingPointDocId = params.currentPosts[params.currentPosts.length - 1].id;
            console.log(params.loadMoreStartAt);
            const startingPointDocRef = await getDoc(
                doc(getFirestore(), "posts", params.loadMoreStartAt)
            );

            console.log("------------------");
            console.log(startingPointDocRef);

            postsQuery = query(
                collection(getFirestore(), "posts"),
                limit(trueCount),
                orderBy("timestamp", "desc"),
                startAt(startingPointDocRef)
            );
        }

        // console.log(postsQuery);

        const postsQuerySnapshot = await getDocs(postsQuery);

        // console.log(postsQuerySnapshot._docs);

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

        if (postsArray.length === trueCount) {
            console.log("overlow, show load more");
            params.setLoadMore(true);
            params.setLoadMoreStartAt(postsArray[postsArray.length - 1].id);
            postsArray.pop();
        } else {
            params.setLoadMore(false);
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
    console.log(postId);
    try {
        const deletedDoc = await deleteDoc(doc(getFirestore(), "posts", postId));
        console.log(deletedDoc);
        return true;
    } catch (error) {
        console.log("Error deleting post: " + error);
        return false;
    }

    // Need to delete all comments associated with post or do I?
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

export { getPost, getPosts, deletePost, submitPost };
