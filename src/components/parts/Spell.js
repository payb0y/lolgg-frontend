import { summonerSpellName } from "../../store/Constants.js";
import { SummonerSpellNames } from "../../store/SummonerSpells";
import { baseURL } from "../../api/LeagueApi.js";
const Spell = ({ summoner, height, width }) => {
    return (
        <img
            src={
                baseURL +
                "/summonerSpellIcon?icon=" +
                summonerSpellName[summoner]
            }
            alt={summonerSpellName[summoner]}
            width={height}
            height={width}
            title={SummonerSpellNames.data[summonerSpellName[summoner]].name}
            style={{ borderRadius: "10%" }}
        />
    );
};
export default Spell;
