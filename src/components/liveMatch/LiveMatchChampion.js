import React from "react";
import { Stack } from "@mui/material";
import { Champions } from "../../store/Champions";
import LiveMatchRunes from "./LiveMatchRunes";
import Champion from "../parts/Champion";
import Spell from "../parts/Spell";

const LiveMatchChampion = ({ participant }) => {
    const { championId, spell1Id, spell2Id } = participant;
    const summoners = [spell1Id, spell2Id];
    let champName;
    for (var key in Champions.data) {
        if (Champions.data[key].key === championId.toString()) {
            champName = Champions.data[key].id;
        }
    }
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
        >
            <Champion championName={champName} width={35} height={35} />
            <Stack>
                {summoners.map((summoner) => (
                    <Spell summoner={summoner} height={20} width={20} />
                ))}
            </Stack>
            <LiveMatchRunes perks={participant.perks} />
        </Stack>
    );
};
export default LiveMatchChampion;
