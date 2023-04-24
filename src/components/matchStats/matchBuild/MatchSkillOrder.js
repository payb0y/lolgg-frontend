import Stack from "@mui/material/Stack";
import Item from "../../UI/Item";
import champions from "../../../data/champions.json";
const MatchSkillOrder = ({ championName, participantId, timeline }) => {
    const championSkillsIcons = [
        {
            icon: `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${champions.data[championName].spells[0].image.full}`,
            key: "Q",
        },
        {
            icon: `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${champions.data[championName].spells[1].image.full}`,
            key: "W",
        },
        {
            icon: `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${champions.data[championName].spells[2].image.full}`,
            key: "E",
        },
        {
            icon: `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${champions.data[championName].spells[3].image.full}`,
            key: "R",
        },
    ];

    const filtered = timeline
        .map((frame) =>
            frame.filter(
                (event) =>
                    event.type.includes("SKILL_LEVEL_UP") &&
                    event.participantId === participantId
            )
        )
        .filter((frame) => frame.length > 0)
        .map((frame) => frame[0]);
    if (filtered.length < 17) {
        for (let i = filtered.length; i < 17; i++) {
            filtered.push({
                skillSlot: 0,
                timestamp: 0,
            });
        }
    }
    return (
        <Item
            sx={{
                backgroundColor: "rgba(128, 128, 128, 0.3)",
            }}
        >
            {championSkillsIcons && (
                <Stack spacing={0.5}>
                    {championSkillsIcons.map((skill, index) => (
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                            key={index}
                        >
                            <span
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    width: "10px",
                                    marginRight: "5px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {skill.key}
                            </span>
                            <img
                                src={skill.icon}
                                alt="skill"
                                style={{
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "20%",
                                }}
                            />
                            {filtered &&
                                filtered.map((skill, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: "5px",
                                            height: "25px",
                                            borderRadius: "20%",
                                            backgroundColor: `${
                                                skill.skillSlot === index + 1
                                                    ? "black"
                                                    : "rgba(0,0,0,0.15)"
                                            }`,
                                        }}
                                    ></div>
                                ))}
                        </Stack>
                    ))}
                </Stack>
            )}
        </Item>
    );
};

export default MatchSkillOrder;
