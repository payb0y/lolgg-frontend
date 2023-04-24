import { useEffect, useState } from "react";
import { getMatchTimelineV1 } from "../../api/LeagueApi.js";
const MatchTimeline = ({ match, participantId }) => {
    const [timeline, setTimeline] = useState(null);
    //make api call to http://localhost:8080/data/item.json using react hook and not useEffect

    useEffect(() => {
        const getTimeline = async () => {
            const t = await getMatchTimelineV1(
                match.platformId + "_" + match.gameId,
                "EUW"
            );
            console.log(t);
            const frames = t.data.info.frames.map((frame) =>
                frame.events.map((event) => event)
            );
            const filtered = frames
                .map((frame) =>
                    frame.filter(
                        (event) =>
                            event.participantId === participantId &&
                            !event.type.includes("ITEM") &&
                            !event.type.includes("SKILL")
                    )
                )
                .filter((frame) => frame.length > 0);
            //console.log(filtered);
            setTimeline(filtered);
        };
        getTimeline();
    }, [match.gameId, match.platformId, participantId]);
};

export default MatchTimeline;
