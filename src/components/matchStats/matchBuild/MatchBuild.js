import React from "react";
import Stack from "@mui/material/Stack";
import MatchSkillOrder from "./MatchSkillOrder.js";
import MatchRunes from "./MatchRunes.js";
import Item from "../../UI/Item.js";

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
