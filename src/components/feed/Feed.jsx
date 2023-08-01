import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getPosts } from "../../firebase/post.js";

import PostCard from "./PostCard.jsx";

import LoadingIcon from "../misc/LoadingIcon.jsx";

import "./Feed.scss";

/*

Parts of Feed
    Sort
    Posts
    Load More Btn
*/

const Feed = (props) => {
    const { subRippleId } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [posts, setPosts] = useState([]);

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

    return <section className="posts-feed">{feedContent()}</section>;
};

Feed.propTypes = {
    subRippleId: PropTypes.string,
};

export default Feed;
