import { assetsURL } from "../../api/LeagueApi.js";
import summoners from "../../data/summoners.json";
import SpellTooltip from "./SpellTooltip.js";

const Spell = ({ summoner, height, width }) => {
    for (var key in summoners.data) {
        if (summoners.data[key].key === summoner.toString()) {
            summoner = summoners.data[key];
        }
    }
    return (
        <SpellTooltip spell={summoner}>
            <img
                src={assetsURL + "spell/" + summoner.id + ".png"}
                alt={summoner.name}
                width={height}
                height={width}
                style={{ borderRadius: "10%" }}
            />
        </SpellTooltip>
    );
};
export default Spell;
