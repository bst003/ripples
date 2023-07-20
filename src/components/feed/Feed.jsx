import { useEffect, useState } from "react";

import { getPosts } from "../../firebase/post.js";

import Post from "./Post.jsx";

import "./Feed.scss";

/*

Parts of Feed
    Sort
    Posts
    Load More Btn
*/

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts(null, null, null, setPosts);
    }, []);

    return (
        <section className="posts-feed">
            {posts.length > 0 ? (
                <>
                    {posts.map((post) => {
                        return (
                            <li key={post.id}>
                                {post.title} <Post />
                            </li>
                        );
                    })}
                </>
            ) : (
                <>Loading</>
            )}
        </section>
    );
};

export default Feed;
