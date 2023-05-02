const WinLoseBar = ({ wins, losses }) => {
    // i want a bar that shows the wins in blue and the losses in red

    // i want the bar to be 100% of the width of the container
    const totalGames = wins + losses;
    const leftWidth = (wins / totalGames) * 100 + "%";
    const rightWidth = (losses / totalGames) * 100 + "%";
    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "20px",
                borderRadius: "4px",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: leftWidth,
                    backgroundColor: "rgba(0, 123, 255, 0.9)",
                }}
            ></div>
            <div
                style={{
                    position: "absolute",
                    left: "10px",
                }}
            >
                {wins}W
            </div>
            <div
                className="fill right"
                style={{
                    height: "100%",
                    width: rightWidth,
                    backgroundColor: "rgba(232, 64, 87, 0.9)",
                }}
            ></div>
            <div
                style={{
                    position: "absolute",
                    right: "10px",
                }}
            >
                {losses}L
            </div>
        </div>
    );
};

export default WinLoseBar;
