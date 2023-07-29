import PropTypes from "prop-types";

import "./PostBody.scss";

const PostBody = (props) => {
    const { content } = props;

    return <div className="pc__body pc__base">{content}</div>;
};

PostBody.propTypes = {
    content: PropTypes.string,
};

export default PostBody;
