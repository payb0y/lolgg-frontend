import { Stack } from "@mui/material";

const MatchKda = ({ currentParticipant, sx }) => {
    const ratio = (
        (currentParticipant.kills + currentParticipant.assists) /
        currentParticipant.deaths
    ).toFixed(2);
    return (
        <Stack
            width={85}
            justifyContent="center"
            alignItems="center"
            sx={
                sx
                    ? sx
                    : {
                          fontSize: "14px",
                      }
            }
        >
            <span>
                {currentParticipant.kills +
                    " \\ " +
                    currentParticipant.deaths +
                    " \\ " +
                    currentParticipant.assists}
            </span>
            <span>
                {currentParticipant.deaths !== 0
                    ? ratio + " KDA"
                    : "Perfect KDA"}
            </span>
            <span>
                {currentParticipant.totalMinionsKilled +
                    currentParticipant.neutralMinionsKilled}{" "}
                CS
            </span>
        </Stack>
    );
};

export default MatchKda;
