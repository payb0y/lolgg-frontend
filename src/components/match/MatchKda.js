import { Stack } from "@mui/material";

const MatchKda = ({participant}) => {
    const ratio = (
        (participant.kills + participant.assists) /
        participant.deaths
    ).toFixed(2);
    return (
        <Stack spacing={0.5} justifyContent="center" alignItems="center">
            <div className="kda">
                {participant.kills +
                    " \\ " +
                    participant.deaths +
                    " \\ " +
                    participant.assists}
            </div>
            <div className="ratio">
                {participant.deaths !== 0
                    ? ratio + " KDA"
                    : "Perfect KDA"}
            </div>
        </Stack>
    );
};

export default MatchKda;
