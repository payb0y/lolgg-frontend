import { useEffect } from "react";
import { getMatchTimelineV1 } from "../../api/LeagueApi.js";
//import { useState } from "react";
// import { Items } from "../../store/Items";
// import { Stack } from "@mui/material";
// import Item from "../parts/Item.js";
// import { ddragon } from "../../api/Request.js";

const MatchItemsOrder = ({ match }) => {
    //const [timeline, setTimeline] = useState(null);
    useEffect(() => {
        const getTimeline = async () => {
            const t = await getMatchTimelineV1(
                match.platformId + "_" + match.gameId
            );
            console.log(t);
            //setTimeline(t);
        };
        getTimeline();
    }, [match.gameId, match.platformId]);

    // const getItemsPurchased = (participantId) => {
    //     //filter items purchased
    //     console.log(timeline);
    //     // timeline.data.info.frames.forEach((frame) => {
    //     //     frame.events.forEach((event) => {
    //     //         if (event.type.includes("ITEM")) {
    //     //             if (event.participantId === participantId) {
    //     //                 items.push({
    //     //                     item: Items.data[event.itemId],
    //     //                     time: event.timestamp,
    //     //                     type: event.type,
    //     //                 });
    //     //             }
    //     //         }
    //     //     });
    //     // });
    //     // participantItems = fixItems(items);
    // };
    //timeline && getItemsPurchased(1);
    // const fixItems = (items) => {
    //     let timelines = [];
    //     let itemsFixed = [];
    //     items.forEach((item) => {
    //         timelines.push(item.time);
    //     });
    //     timelines = [...new Set(timelines)];
    //     timelines.forEach((timeline) => {
    //         let temp = [];
    //         items.forEach((item) => {
    //             if (item.time === timeline) {
    //                 temp.push(item);
    //             }
    //         });
    //         itemsFixed.push(temp);
    //     });
    //     return itemsFixed;
    // };
    // timeline && getItemsPurchased(participantId);
    // console.log(participantItems);
    // return (
    //     // <>
    //     //     {participantItems && (
    //     //         <Stack direction="row" spacing={1}>
    //     //             {participantItems.map((item) => (
    //     //                 <Stack direction="row" spacing={0}>
    //     //                     {item
    //     //                         .filter((i) => i.type === "ITEM_PURCHASED")
    //     //                         .map((i) => (
    //     //                             <Item
    //     //                                 item={i.item}
    //     //                                 content={i.item}
    //     //                                 src={`${ddragon}/item/${i.item.image.full}`}
    //     //                                 width={20}
    //     //                                 height={20}
    //     //                             />
    //     //                         ))}
    //     //                 </Stack>
    //     //             ))}
    //     //         </Stack>
    //     //     )}
    //     // </>
    // );
};

export default MatchItemsOrder;
