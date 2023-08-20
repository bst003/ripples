import PropTypes from "prop-types";

const LoadMore = (props) => {
    const { triggerLoadMore } = props;

    return (
        <div className="btns-contain center">
            <button className="btn-el " type="button" onClick={triggerLoadMore}>
                Load more
            </button>
        </div>
    );
};

LoadMore.propTypes = {
    triggerLoadMore: PropTypes.func.isRequired,
};

export default LoadMore;
