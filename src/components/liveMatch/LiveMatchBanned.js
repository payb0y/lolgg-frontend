import React from "react";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Champion from "../parts/Champion";
import champions from "../../data/champions.json";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black ",
}));
const LiveMatchBanned = ({ match }) => {
    // get the banned champions
    const bannedChampions = match.bannedChampions;
    //get champion name
    let champNames = [];
    bannedChampions.forEach((champion) => {
        for (var key in champions.data) {
            if (champions.data[key].key === champion.championId.toString()) {
                champNames.push(champions.data[key].id);
            }
        }
    });
    const blueTeamBans = champNames.slice(0, 5);
    const redTeamBans = champNames.slice(5, 10);
    return (
        <>
            {bannedChampions.length !== 0 && (
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Item
                        sx={{
                            backgroundColor: "rgba(232, 64, 87, 0.9)",
                            display: "flex",
                            gap: "2px",
                        }}
                    >
                        {redTeamBans.map((champName) => (
                            <Champion
                                championName={champName}
                                width="30px"
                                height="30px"
                                style={{ borderRadius: "10%" }}
                            />
                        ))}
                    </Item>
                    <Item>Bans</Item>
                    <Item
                        sx={{
                            backgroundColor: "rgba(83, 131, 232, 0.9) ",
                            display: "flex",
                            gap: "2px",
                        }}
                    >
                        {blueTeamBans.map((champName) => (
                            <Champion
                                championName={champName}
                                width="30px"
                                height="30px"
                                style={{ borderRadius: "10%" }}
                            />
                        ))}
                    </Item>
                </Stack>
            )}
        </>
    );
};

export default LiveMatchBanned;
