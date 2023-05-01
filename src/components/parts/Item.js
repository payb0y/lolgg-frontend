import React from "react";
import { assetsURL } from "../../api/LeagueApi";
import TooltipLeague from "./TooltipLeague";
import items from "../../data/items.json";

const Item = ({ width, height, item }) => {
    const content = items.data[item];
    if (item === 0)
        return (
            <div
                style={{
                    width: width,
                    height: height,
                    backgroundColor: "rgb(39, 38, 38, 0.2)",
                }}
            ></div>
        );
    else
        return (
            <TooltipLeague content={content}>
                <img
                    src={assetsURL + "item/" + item + ".png"}
                    alt={item}
                    width={width}
                    height={height}
                    style={{ borderRadius: "10%" }}
                />
            </TooltipLeague>
        );
};

export default Item;
