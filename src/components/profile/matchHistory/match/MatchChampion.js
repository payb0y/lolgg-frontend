import { Stack } from "@mui/material";
import Champion from "../../../parts/Champion";

const MatchChampion = ({ currentParticipant, height, width, style }) => {
    const { champLevel, championName } = currentParticipant;
    return (
        <Stack
            alignItems="center"
            justifyContent="flex-start"
            style={{ position: "relative" }}
        >
            <Champion
                championName={championName}
                height={height}
                width={width}
                style={style}
            />
            <span className="level">{champLevel}</span>
        </Stack>
    );
};
export default MatchChampion;
