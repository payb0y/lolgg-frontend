// Item.js
import React from "react";
import { assetsURL } from "../../api/LeagueApi";
import TooltipLeague from "./TooltipLeague";
import items from "../../data/items.json";
import { Box, Typography } from "@mui/material";

const Item = ({ width, height, item, sx }) => {
  const content = items.data[item];
  if (item === 0)
    return (
      <Box
        sx={{
          width: width,
          height: height,
          backgroundColor: "rgb(39, 38, 38, 0.2)",
          ...sx,
        }}
      ></Box>
    );
  else
    return (
      <TooltipLeague content={content}>
        <Box position="relative" width={width} height={height} sx={{ ...sx }}>
          <img
            src={assetsURL + "item/" + item + ".png"}
            alt={item}
            width="100%"
            height="100%"
            style={{ borderRadius: "10%", display: "block" }}
          />
          {sx?.["& .sold"] && (
            <Typography
              variant="caption"
              color="red"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                fontWeight: "bold",
              }}
            >
              X
            </Typography>
          )}
        </Box>
      </TooltipLeague>
    );
};

export default Item;
