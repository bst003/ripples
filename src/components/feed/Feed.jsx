import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getPosts } from "../../firebase/post.js";

import PostCard from "./post-card/PostCard.jsx";

import LoadingIcon from "../misc/LoadingIcon.jsx";

import LoadMore from "./LoadMore.jsx";

import "./Feed.scss";

/*

How to offset posts?
    https://firebase.google.com/docs/firestore/query-data/query-cursors

REFACTOR getData methods to take OBJ as argument? 

*/

const Feed = (props) => {
    const { subRippleId } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [posts, setPosts] = useState([]);

    // const [postsCount, setPostsCount] = useState(10);

    useEffect(() => {
        setIsLoading(true);

        let idParam = null;
        if (subRippleId) {
            idParam = subRippleId;
        }

        const getPostsUpdateLoad = async () => {
            await getPosts(setPosts, null, idParam);
            setIsLoading(false);
        };

        getPostsUpdateLoad();
    }, [subRippleId]);

    const feedContent = () => {
        if (isLoading) {
            return <LoadingIcon />;
        } else {
            if (posts.length > 0) {
                return (
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
                );
            } else {
                return <>No posts found</>;
            }
        }
    };

    return (
        <section className="posts-feed">
            {feedContent()}
            <LoadMore />
        </section>
    );
};

Feed.propTypes = {
    subRippleId: PropTypes.string,
};

export default Feed;
