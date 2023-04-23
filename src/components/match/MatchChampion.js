import { Stack } from "@mui/material";
import Champion from "../parts/Champion";

const MatchChampion = ({ participant, height, width }) => {
    const { champLevel, championName } = participant;
    return (
        <Stack>
            <Champion
                championName={championName}
                height={height}
                width={width}
            />
            <span className="level">{champLevel}</span>
        </Stack>
    );
};
export default MatchChampion;
