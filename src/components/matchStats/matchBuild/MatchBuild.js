import Stack from "@mui/material/Stack";
import MatchSkillOrder from "./MatchSkillOrder.js";
import MatchRunes from "./MatchRunes.js";
import Item from "../../UI/Item.js";
import { useState, useEffect } from "react";
import { getMatchTimelineV1 } from "../../../api/LeagueApi";
import CircularProgress from "@mui/material/CircularProgress";

const MatchBuild = ({ participant, match }) => {
    const [timeline, setTimeline] = useState(null);

    useEffect(() => {
        const timeline = async () => {
            const t = await getMatchTimelineV1(
                match.platformId + "_" + match.gameId,
                "EUW"
            );
            const frames = t.data.info.frames.map((frame) =>
                frame.events.map((event) => event)
            );
            setTimeline(frames);
        };
        timeline();
    }, [match.gameId, match.platformId]);

    return (
        <Item
            sx={{
                padding: "20px",
            }}
        >
            <Stack
                alignItems="center"
                justifyContent="center"
                direction="row"
                spacing={5}
            >
                {timeline ? (
                    <>
                        <MatchRunes participant={participant} />
                        <MatchSkillOrder
                            participantId={participant.participantId}
                            championName={participant.championName}
                            timeline={timeline}
                        />
                    </>
                ) : (
                    <CircularProgress />
                )}
            </Stack>
        </Item>
    );
};

export default MatchBuild;
