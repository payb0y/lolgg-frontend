import { useEffect, useState } from "react";
import { getMatchTimelineV1 } from "../../api/LeagueApi";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { getChampionJsonV1 } from "../../api/LeagueApi";

const Card = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black ",
}));
const MatchSkillOrder = ({ match, championName, participantId }) => {
    const [timeline, setTimeline] = useState(null);
    const [championSkillsIcons, setChampionSkillsIcons] = useState(null);
    useEffect(() => {
        const skillIcons = async () => {
            const c = await getChampionJsonV1(championName);
            setChampionSkillsIcons([
                {
                    icon: `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${c.data.data[championName].spells[0].image.full}`,
                    key: "Q",
                },
                {
                    icon: `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${c.data.data[championName].spells[1].image.full}`,
                    key: "W",
                },
                {
                    icon: `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${c.data.data[championName].spells[2].image.full}`,
                    key: "E",
                },
                {
                    icon: `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${c.data.data[championName].spells[3].image.full}`,
                    key: "R",
                },
            ]);
        };
        skillIcons();
    }, [championName]);
    useEffect(() => {
        const timeline = async () => {
            const t = await getMatchTimelineV1(
                match.platformId + "_" + match.gameId,
                "EUW"
            );
            const frames = t.data.info.frames.map((frame) =>
                frame.events.map((event) => event)
            );
            const filtered = frames
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
            setTimeline(filtered);
        };
        timeline();
    }, [match.gameId, match.platformId, participantId]);
    return (
        <Card
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
                            {timeline &&
                                timeline.map((skill, i) => (
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
        </Card>
    );
};

export default MatchSkillOrder;
