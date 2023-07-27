import PropTypes from "prop-types";

const TimeStamp = (props) => {
    const { timestamp } = props;

    const setTimeStampDigits = (minPassed) => {
        let digits;

        if (minPassed < 60) {
            digits = minPassed;
        } else if (minPassed < 60 * 24) {
            digits = minPassed / 60;
        } else if (minPassed < 60 * 24 * 7) {
            digits = minPassed / (60 * 24);
        } else {
            digits = minPassed / (60 * 24 * 7);
        }

        return Math.floor(digits);
    };

    const setTimestampSuffix = (minPassed) => {
        let suffix;
        if (minPassed < 60) {
            suffix = "min";
        } else if (minPassed < 60 * 24) {
            suffix = "hr";
        } else if (minPassed < 60 * 24 * 7) {
            suffix = "day";
        } else {
            suffix = "wk";
        }

        return suffix;
    };

    const getFormattedTimeStamp = () => {
        const today = Math.abs(new Date().getTime());

        const minPassed = (today - timestamp) / (1000 * 60);

        const suffix = setTimestampSuffix(minPassed);

        const digits = setTimeStampDigits(minPassed);

        return digits + " " + suffix;
    };

    return <span className="timestamp">{getFormattedTimeStamp()}</span>;
};

TimeStamp.propTypes = {
    timestamp: PropTypes.number.isRequired,
};

export default TimeStamp;
