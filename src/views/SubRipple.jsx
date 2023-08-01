import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import Feed from "../components/feed/Feed";
import LoadingIcon from "../components/misc/LoadingIcon";

import { getForum } from "../firebase/forum";

const SubRipple = () => {
    let { slug } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const [forum, setForum] = useState(null);

    useEffect(() => {
        setIsLoading(false);

        const getForumUpdateLoad = async () => {
            await getForum(setForum, null, slug);
            setIsLoading(false);
        };

        getForumUpdateLoad();
    }, [slug]);

    const setPageTitle = () => {
        if (slug && forum) {
            return forum.label;
        } else {
            return "Front Page";
        }
    };

    const mainContent = () => {
        if (isLoading || !forum) {
            return <LoadingIcon />;
        } else {
            return <Feed subRippleId={forum.id} />;
        }
    };

    return (
        <div>
            <h1>{setPageTitle()}</h1>
            {mainContent()}
        </div>
    );
};

export default SubRipple;
