import PropTypes from "prop-types";

const TimeStamp = (props) => {
    const { timestamp } = props;

    const formatTimeStamp = () => {
        const today = Math.abs(new Date().getTime());

        const test = parseInt((today - timestamp * 1000) / (1000 * 60 * 60 * 24), 10);

        console.log(new Date(timestamp * 1000));

        console.log("stamp: " + timestamp);

        console.log("today: " + today);

        console.log("diff: " + test);
    };

    return <span className="timestamp">{formatTimeStamp()}</span>;
};

TimeStamp.propTypes = {
    timestamp: PropTypes.number.isRequired,
};

export default TimeStamp;
