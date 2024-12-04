// MatchItemsOrder.js
import { useEffect, useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import Item from "../../../../../parts/Item";
import CustomPaper from "../../../../../UI/CustomPaper";

const MatchItemsOrder = ({ timeline, participantId }) => {
  const [groupedTimeline, setGroupedTimeline] = useState([]);

  console.log(timeline);
  useEffect(() => {
    const events = timeline
      .flat()
      .filter(
        (event) =>
          (event.type === "ITEM_PURCHASED" || event.type === "ITEM_SOLD") &&
          event.participantId === participantId &&
          event.type !== "ITEM_UNDO"
      );
    console.log(events);
    const sorted = events.sort((a, b) => a.timestamp - b.timestamp);

    // Group events that occur within 30 seconds
    const grouped = [];
    let group = [];
    let groupTimestamp = null;

    for (let i = 0; i < sorted.length; i++) {
      const event = sorted[i];
      if (
        groupTimestamp === null ||
        event.timestamp - groupTimestamp <= 30000
      ) {
        group.push(event);
      } else {
        grouped.push({ events: group, timestamp: groupTimestamp });
        group = [event];
      }
      groupTimestamp = event.timestamp;
    }
    if (group.length > 0) {
      grouped.push({ events: group, timestamp: groupTimestamp });
    }

    setGroupedTimeline(grouped);
  }, [timeline, participantId]);

  const formatTimestamp = (ms) => {
    const minutes = Math.floor(ms / 60000);
    return `${minutes}min`;
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="flex-end"
      sx={{ flexWrap: "wrap" }}
    >
      {groupedTimeline.map((group, index) => (
        <Stack key={index} spacing={0.5} alignItems="center">
          <CustomPaper
            sx={{
              backgroundColor: "rgba(128, 128, 128, 0.3)",
            }}
          >
            <Stack direction="row" spacing={0.5}>
              {group.events.map((event, idx) => (
                <Item
                  key={idx}
                  item={event.itemId}
                  width={24}
                  height={24}
                  sx={
                    event.type === "ITEM_SOLD"
                      ? {
                          filter: "brightness(0.5)",
                          "& .sold": true,
                        }
                      : {}
                  }
                />
              ))}
            </Stack>
          </CustomPaper>
          <Typography variant="caption">
            {formatTimestamp(group.timestamp)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default MatchItemsOrder;
