import React from "react";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Champion from "../parts/Champion";
import champions from "../../data/champions.json";
import CustomPaper from "../UI/CustomPaper";

const LiveMatchBanned = ({ match }) => {
    const bannedChampions = match.bannedChampions;
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
                    <CustomPaper
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
                    </CustomPaper>
                    <CustomPaper>Bans</CustomPaper>
                    <CustomPaper
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
                    </CustomPaper>
                </Stack>
            )}
        </>
    );
};

export default LiveMatchBanned;
