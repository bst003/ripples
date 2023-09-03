import PropTypes from "prop-types";

const LoadMore = (props) => {
    const { triggerLoadMore, isSmall } = props;

    return (
        <div className="btns-contain center">
            <button
                className={"btn-el" + (isSmall ? " small" : "")}
                type="button"
                onClick={triggerLoadMore}
            >
                Load more
            </button>
        </div>
    );
};

LoadMore.propTypes = {
    triggerLoadMore: PropTypes.func.isRequired,
    isSmall: PropTypes.bool,
};

export default LoadMore;
