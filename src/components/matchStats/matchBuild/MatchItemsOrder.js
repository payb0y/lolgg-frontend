import { useEffect } from "react";
import { getMatchTimelineV1 } from "../../../api/LeagueApi.js";
import { useState } from "react";
import { baseURL } from "../../../api/LeagueApi.js";
import { Items } from "../../../store/Items";
import Item from "../../parts/Item";

const MatchItemsOrder = ({ match, participantId }) => {
    const [timeline, setTimeline] = useState(null);
    useEffect(() => {
        const getTimeline = async () => {
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
                            event.type.includes("ITEM") &&
                            event.participantId === participantId
                    )
                )
                .filter((frame) => frame.length > 0);
            //console.log(filtered);
            setTimeline(filtered);
        };
        getTimeline();
    }, [match.gameId, match.platformId, participantId]);

    return (
        <>
            {timeline &&
                timeline.map((event) => {
                    return event.map((e, index) => {
                        console.log(e);
                        const item = Items.data[e.itemId];
                        //console.log(item);
                        return (
                            <Item
                                alt={"item"}
                                src={
                                    baseURL +
                                    "/assets/itemIcon?icon=" +
                                    e.itemId
                                }
                                width={30}
                                height={30}
                                content={item}
                                item={item}
                                key={index}
                            />
                        );
                    });
                })}
        </>
    );
};

export default MatchItemsOrder;
