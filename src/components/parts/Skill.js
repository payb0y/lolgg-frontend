import { assetsURL } from "../../api/LeagueApi";
import SpellTooltip from "./SpellTooltip";
const Skill = ({ skill, height, width }) => {
    return (
        <SpellTooltip spell={skill}>
            <img
                src={assetsURL + "spell/" + skill.image.full}
                height={height}
                width={width}
                alt="skill"
                style={{
                    borderRadius: "20%",
                }}
            />
        </SpellTooltip>
    );
};
export default Skill;
