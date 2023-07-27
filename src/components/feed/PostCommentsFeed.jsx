import PropTypes from "prop-types";

import "./PostCommentsFeed.scss";

const PostCommentsFeed = (props) => {
    const { id } = props;

    console.log(id);

    return <div className="pc__comments-feed">feed here</div>;
};

PostCommentsFeed.propTypes = {
    id: PropTypes.string,
};

export default PostCommentsFeed;
