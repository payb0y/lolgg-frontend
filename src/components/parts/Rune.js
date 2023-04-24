import { assetsURL } from "../../api/LeagueApi";
import RuneTooltip from "./RuneTooltip";

const Rune = ({ rune, width, height }) => {
    return (
        <RuneTooltip rune={rune}>
            <img
                src={assetsURL + rune.icon}
                alt={rune.name}
                width={width}
                height={height}
                style={{
                    backgroundColor: "black",
                    borderRadius: "50%",
                }}
            />
        </RuneTooltip>
    );
};
export default Rune;
