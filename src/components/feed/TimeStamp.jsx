import PropTypes from "prop-types";

/*
    Split formatTimeStamp into multiple functions
*/

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
            suffix = "week";
        }

        return suffix;
    };

    const getFormattedTimeStamp = () => {
        const today = Math.abs(new Date().getTime());

        // const test = parseInt((today - timestamp * 1000) / (1000 * 60 * 60 * 24), 10);

        // const daysPassed = (today - timestamp) / (1000 * 60 * 60 * 24);

        // const hoursPassed = (today - timestamp) / (1000 * 60 * 60);
        const minPassed = (today - timestamp) / (1000 * 60);

        const suffix = setTimestampSuffix(minPassed);

        const digits = setTimeStampDigits(minPassed);

        console.log(minPassed);

        console.log(digits);

        console.log(suffix);

        // console.log(new Date(timestamp));

        // console.log("stamp: " + timestamp);

        // console.log("today: " + today);

        // console.log("diff: " + hoursPassed);

        console.log("-----------------");

        return digits + " " + suffix;
    };

    return <span className="timestamp">{getFormattedTimeStamp()}</span>;
};

TimeStamp.propTypes = {
    timestamp: PropTypes.number.isRequired,
};

export default TimeStamp;
