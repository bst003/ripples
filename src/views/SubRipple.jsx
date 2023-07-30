import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import Feed from "../components/feed/Feed";

import { getForum } from "../firebase/forum";

const SubRipple = () => {
    let { slug } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const [forum, setForum] = useState(null);

    useEffect(() => {
        setIsLoading(false);

        const getForumUpdateLoad = async () => {
            console.log(slug);
            await getForum(setForum, null, slug);
            console.log(forum);
            setIsLoading(false);
        };

        getForumUpdateLoad();
    }, [slug]);

    const setPageTitle = () => {
        if (slug && forum) {
            return "Test";
        } else {
            return "Front Page";
        }
    };

    return (
        <div>
            <h1>{setPageTitle()}</h1>
            {isLoading ? <></> : <Feed />}
            {/* <Feed /> */}
        </div>
    );
};

export default SubRipple;
