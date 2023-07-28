import { useEffect, useState } from "react";

import { getForum } from "../../firebase/forum";

import PropTypes from "prop-types";

const PostSubRipple = (props) => {
    const { forumId } = props;

    const [forum, setForum] = useState(null);
    useEffect(() => {
        getForum(forumId, setForum);
    }, []);

    return <div className="pc__sub-ripple">{forum ? <>{forum.label}</> : <></>}</div>;
};

PostSubRipple.propTypes = {
    forumId: PropTypes.string,
};

export default PostSubRipple;
