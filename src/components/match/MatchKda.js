import { Stack } from "@mui/material";

const MatchKda = ({ participant }) => {
    const ratio = (
        (participant.kills + participant.assists) /
        participant.deaths
    ).toFixed(2);
    return (
        <Stack width={85} justifyContent="center" alignItems="center">
            <span>
                {participant.kills +
                    " \\ " +
                    participant.deaths +
                    " \\ " +
                    participant.assists}
            </span>
            <span>
                {participant.deaths !== 0 ? ratio + " KDA" : "Perfect KDA"}
            </span>
            <span>
                {participant.totalMinionsKilled +
                    participant.neutralMinionsKilled}{" "}
                CS
            </span>
        </Stack>
    );
};

export default MatchKda;
