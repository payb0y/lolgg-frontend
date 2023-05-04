export const getGameType = (queueId) => {
    switch (queueId) {
        case 450:
            return "ARAM";
        case 420:
            return "Ranked Solo";
        case 400:
            return "Normal";
        case 900:
            return "URF";
        case 700:
            return "Clash";
        case 440:
            return "Ranked Flex";
        case 430:
            return "Blind Pick";
        default:
            return "Unknown";
    }
};
export const getGameDate = (gameEndTimestamp) => {
    const a = Math.floor((Date.now() - gameEndTimestamp) / 86400000);
    if (a === 0) {
        if (
            Math.floor((Date.now() - gameEndTimestamp) / 60000).toString() > 60
        ) {
            return (
                Math.floor(
                    (Date.now() - gameEndTimestamp) / 3600000
                ).toString() + " hours ago"
            );
        } else {
            return (
                Math.floor((Date.now() - gameEndTimestamp) / 60000).toString() +
                " minutes ago"
            );
        }
    } else if (a < 1) {
        return (
            Math.floor((Date.now() - gameEndTimestamp) / 3600000).toString() +
            " hours ago"
        );
    } else {
        return a + " days ago";
    }
};
