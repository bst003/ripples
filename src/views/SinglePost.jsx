import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import LoadingIcon from "../components/misc/LoadingIcon";

import PostCard from "../components/feed/post-card/PostCard";

import { getPost } from "../firebase/post";

const SinglePost = () => {
    let { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const [post, setPost] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        console.log(id);

        const getForumUpdateLoad = async () => {
            await getPost(setPost, id);
            setIsLoading(false);
        };

        getForumUpdateLoad();
    }, [id]);

    const singlePostContent = () => {
        if (isLoading || !post) {
            return <LoadingIcon />;
        } else {
            return (
                <PostCard
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    userGoogleId={post.userGoogleId}
                    forumId={post.forumId}
                    timestamp={post.timestamp}
                />
            );
        }
    };

    return <section className="posts-feed">{singlePostContent()}</section>;
};

export default SinglePost;
