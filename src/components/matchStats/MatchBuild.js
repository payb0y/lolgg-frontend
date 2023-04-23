import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import MatchSkillOrder from "./MatchSkillOrder.js";
import MatchRunes from "./MatchRunes.js";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black ",
}));

const MatchBuild = ({ participant, match }) => {
    return (
        <Item
            sx={{
                padding: "20px",
            }}
        >
            <Stack
                alignItems="center"
                justifyContent="center"
                direction="row"
                spacing={5}
            >
                <MatchRunes participant={participant} />
                <MatchSkillOrder
                    match={match}
                    participantId={participant.participantId}
                    championName={participant.championName}
                />
            </Stack>
        </Item>
    );
};

export default MatchBuild;
