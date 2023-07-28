import { useEffect, useState } from "react";

import { getPosts } from "../../firebase/post.js";

import PostCard from "./PostCard.jsx";

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
                            <PostCard
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                userGoogleId={post.userGoogleId}
                                forumId={post.forumId}
                                timestamp={post.timestamp}
                            />
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
