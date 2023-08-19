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
    const { subRippleId, userGoogleId } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [posts, setPosts] = useState([]);

    // Stores the ID of the starting point of the next batch of loaded posts
    const [loadMoreStartPointID, setLoadMoreStartPointID] = useState(null);

    const constructQueryParams = () => {
        console.log("constructing params now");
        const queryParams = {
            setPostState: setPosts,
            setLoadMoreStartPointID: setLoadMoreStartPointID,
            loadMoreStartPointID: loadMoreStartPointID,
            count: 10,
        };

        if (subRippleId) {
            queryParams.subRippleId = subRippleId;
        }

        if (userGoogleId) {
            queryParams.userGoogleId = userGoogleId;
        }

        queryParams.currentPosts = [];
        if (posts) {
            queryParams.currentPosts = posts;
        }

        return queryParams;
    };

    const loadMorePosts = () => {
        if (loadMoreStartPointID) {
            getPosts(constructQueryParams());
        }
    };

    useEffect(() => {
        setIsLoading(true);

        const getPostsUpdateLoad = async () => {
            await getPosts(constructQueryParams());
            setIsLoading(false);
        };

        getPostsUpdateLoad();
    }, [subRippleId, userGoogleId]);

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

    const loadMoreContent = () => {
        if (loadMoreStartPointID) {
            return <LoadMore triggerLoadMore={loadMorePosts} />;
        }
    };

    return (
        <section className="posts-feed">
            {feedContent()}
            {loadMoreContent()}
        </section>
    );
};

Feed.propTypes = {
    subRippleId: PropTypes.string,
    userGoogleId: PropTypes.string,
};

export default Feed;
