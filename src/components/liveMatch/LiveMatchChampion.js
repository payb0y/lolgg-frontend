import React from "react";
import { Stack } from "@mui/material";
import LiveMatchRunes from "./LiveMatchRunes";
import Champion from "../parts/Champion";
import Spell from "../parts/Spell";
import champions from "../../data/champions.json";

const LiveMatchChampion = ({ participant }) => {
    const { championId, spell1Id, spell2Id } = participant;
    const summoners = [spell1Id, spell2Id];
    let champName;
    for (var key in champions.data) {
        if (champions.data[key].key === championId.toString()) {
            champName = champions.data[key].id;
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
