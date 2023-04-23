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
