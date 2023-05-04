import Stack from "@mui/material/Stack";
import champions from "../../../../../../data/champions.json";
import Skill from "../../../../../parts/Skill";
import CustomPaper from "../../../../../UI/CustomPaper";
import Box from "@mui/material/Box";
const MatchSkillOrder = ({ championName, participantId, timeline }) => {
    const championSkills = [
        {
            key: "Q",
        },
        {
            key: "W",
        },
        {
            key: "E",
        },
        {
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
        <CustomPaper
            sx={{
                backgroundColor: "rgba(128, 128, 128, 0.3)",
                padding: "10px",
            }}
        >
            <Stack spacing={0.5}>
                {championSkills.map((skill, index) => (
                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                        key={index}
                    >
                        <Box
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
                        </Box>
                        <Skill
                            skill={champions.data[championName].spells[index]}
                            width="25px"
                            height="25px"
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
        </CustomPaper>
    );
};

export default MatchSkillOrder;
