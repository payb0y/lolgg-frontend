import { Stack } from "@mui/material";

const MatchMinions = ({ participant }) => {
    const { totalMinionsKilled, visionWardsBoughtInGame } = participant;

    return (
        <Stack
            justifyContent="center"
            sx={{
                fontSize: 12,
            }}
        >
            <span>
                CS {totalMinionsKilled + participant.neutralMinionsKilled}
            </span>
            <span>Control Ward {visionWardsBoughtInGame}</span>
        </Stack>
    );
};

export default MatchMinions;
