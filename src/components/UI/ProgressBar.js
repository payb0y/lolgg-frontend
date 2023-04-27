const ProgressBar = ({ value, maxValue, teamId, height }) => {
    const percentage = (value / maxValue) * 100;
    const limitedPercentage = Math.min(percentage, 100);
    const style = {
        width: `${limitedPercentage}%`,
        backgroundColor:
            teamId === 100
                ? "rgba(83, 131, 232, 0.9)"
                : "rgba(232, 64, 87, 0.9)",
        height: height,
    };

    return <div className="progress-bar" style={style} />;
};

export default ProgressBar;
