import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getForum } from "../../firebase/forum";

import PropTypes from "prop-types";

const PostSubRipple = (props) => {
    const { forumId } = props;

    const [forum, setForum] = useState(null);
    useEffect(() => {
        getForum(forumId, setForum);
    }, [forumId]);

    const PostSubRippleContent = () => {
        if (forum) {
            return (
                <div className="pc__sub-ripple pc__base">
                    <Link to={"/r/" + forum.slug}>{"/r/" + forum.label}</Link>
                </div>
            );
        } else {
            return <></>;
        }
    };

    return <>{PostSubRippleContent()}</>;
};

PostSubRipple.propTypes = {
    forumId: PropTypes.string,
};

export default PostSubRipple;
