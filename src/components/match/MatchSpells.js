import { Stack } from "@mui/material";
import Spell from "../parts/Spell";
const MatchSpells = ({ participant, height, width }) => {
    const { summoner1Id, summoner2Id } = participant;
    const summoners = [summoner1Id, summoner2Id];
    return (
        <Stack alignItems="center" justifyContent="center" spacing={0.3}>
            {summoners.map((summoner) => (
                <Spell
                    summoner={summoner}
                    height={height}
                    width={width}
                    key={summoner}
                />
            ))}
        </Stack>
    );
};

export default MatchSpells;
