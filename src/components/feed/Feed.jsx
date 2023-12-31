import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getPosts } from "../../firebase/post.js";

import PostCard from "./post-card/PostCard.jsx";

import LoadingIcon from "../misc/LoadingIcon.jsx";

import LoadMore from "./LoadMore.jsx";

import "./Feed.scss";

const Feed = (props) => {
    const { subRippleId, userGoogleId, searchQuery } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [posts, setPosts] = useState([]);

    // Stores the ID of the starting point of the next batch of loaded posts
    const [loadMoreStartPointID, setLoadMoreStartPointID] = useState(null);

    const constructQueryParams = (resetPosts = false) => {
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

        if (searchQuery) {
            queryParams.searchQuery = searchQuery;
        }

        queryParams.currentPosts = [];
        if (posts && !resetPosts) {
            queryParams.currentPosts = posts;
        }

        return queryParams;
    };

    const loadMorePosts = async () => {
        if (loadMoreStartPointID) {
            setIsLoading(true);
            await getPosts(constructQueryParams());
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        // setPosts([]);

        const getPostsUpdateLoad = async () => {
            await getPosts(constructQueryParams(true));
            setIsLoading(false);
        };

        getPostsUpdateLoad();
    }, [searchQuery]);

    useEffect(() => {
        setIsLoading(true);
        // setPosts([]);

        const getPostsUpdateLoad = async () => {
            await getPosts(constructQueryParams());
            setIsLoading(false);
        };

        getPostsUpdateLoad();
    }, [subRippleId, userGoogleId]);

    const feedContent = () => {
        if (isLoading && posts.length === 0) {
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
            return (
                <>
                    {isLoading && posts.length > 0 && <LoadingIcon />}
                    {!isLoading && <LoadMore triggerLoadMore={loadMorePosts} />}
                </>
            );
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
    searchQuery: PropTypes.string,
};

export default Feed;
