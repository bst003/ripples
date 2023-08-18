import PropTypes from "prop-types";

const LoadMore = (props) => {
    const { triggerLoadMore } = props;

    return (
        <button className="btn-el" type="button" onClick={triggerLoadMore}>
            Load more
        </button>
    );
};

LoadMore.propTypes = {
    triggerLoadMore: PropTypes.func.isRequired,
};

export default LoadMore;
