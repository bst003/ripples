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
    const [posts, setPosts] = useState([]);
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
                    id: doc.id,
                    title: doc.data().title,
                    content: doc.data().content,
                    userGoogleId: doc.data().userGoogleId,
                };

                console.log(postObj);

                postsArray.push(postObj);
            });

            setPosts(postsArray);
        } catch (error) {
            console.log("Error fetching posts: " + error);
        }
    };

    useEffect(() => {
        getPosts();
        // const requestedPosts = getPosts();
        // console.log(requestedPosts);

        // setPosts(requestedPosts);
    }, []);

    return (
        <section className="posts-feed">
            {posts.length > 0 ? (
                <>
                    {posts.map((post) => {
                        return <li key={post.id}>{post.title}</li>;
                    })}
                </>
            ) : (
                <>Loading</>
            )}
        </section>
    );
};

export default Feed;
