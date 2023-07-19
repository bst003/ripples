import { useEffect, useState } from "react";

import { collection, getFirestore, getDocs, limit, query } from "firebase/firestore/lite";

import "./Feed.scss";

/*

Parts of Feed
    Sort
    Posts
    Load More Btn
*/

const Feed = () => {
    const [posts, setPosts] = useState(null);
    const getPosts = async (userGoogleId = null, subRippleId = null) => {
        try {
            if (userGoogleId) {
                console.log(userGoogleId);
            }

            if (subRippleId) {
                console.log(subRippleId);
            }

            const postsQuery = query(collection(getFirestore(), "posts"), limit(10));

            const postsQuerySnapshot = await getDocs(postsQuery);

            const postsArray = [];
            postsQuerySnapshot.forEach((doc) => {
                const postObj = {
                    title: doc.data().title,
                    content: doc.data().content,
                    userGoogleId: doc.data().userGoogleId,
                };

                console.log(postObj);

                postsArray.push(postObj);
            });

            return postsArray;
        } catch (error) {
            console.log("Error fetching posts: " + error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return <section className="posts-feed">Feed here</section>;
};

export default Feed;
