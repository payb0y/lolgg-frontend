import Stack from "@mui/material/Stack";
import MatchSkillOrder from "./MatchSkillOrder.js";
import MatchRunes from "./MatchRunes.js";
import { useState, useEffect } from "react";
import { getMatchTimelineV1 } from "../../../api/LeagueApi";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MatchBuild = ({ participant, match }) => {
    const [timeline, setTimeline] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Stack
            alignItems="center"
            justifyContent="center"
            direction={isMobile ? "column" : "row"}
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
    );
};

export default MatchBuild;
