import { useContext } from "react";
import { SummonerContext } from "../../store/SummonerContext";
import { Stack } from "@mui/material";
import { getGameType } from "../utils/Utils";
import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";

const MatchInfo = (props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { summonerData } = useContext(SummonerContext);
    const { gameDuration, gameEndTimestamp, queueId } = props.match.info;
    const getGameDate = () => {
        const a = Math.floor((Date.now() - gameEndTimestamp) / 86400000);
        if (a === 0) {
            if (
                Math.floor((Date.now() - gameEndTimestamp) / 60000).toString() >
                60
            ) {
                return (
                    Math.floor(
                        (Date.now() - gameEndTimestamp) / 3600000
                    ).toString() + " hours ago"
                );
            } else {
                return (
                    Math.floor(
                        (Date.now() - gameEndTimestamp) / 60000
                    ).toString() + " minutes ago"
                );
            }
        } else if (a < 1) {
            return (
                Math.floor(
                    (Date.now() - gameEndTimestamp) / 3600000
                ).toString() + " hours ago"
            );
        } else {
            return a + " days ago";
        }
    };
    const gameResult =
        props.match.info.participants.find(
            (participant) => participant.summonerName === summonerData.name
        ).win === true
            ? "Victory"
            : "Defeat";
    const gameDate = getGameDate();
    const duration =
        parseInt(gameDuration / 60) + "m : " + (gameDuration % 60) + "s";
    const mode = getGameType(queueId);

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
            sx={{
                width: isMobile ? "80px" : "115px",
                fontSize: isMobile ? "13px" : "14px",
            }}
        >
            <div style={{ fontWeight: "bold" }}>{mode}</div>
            <div className="">{gameDate}</div>
            <div className="bar"></div>
            <div className="">{gameResult}</div>
            <div className="">{duration}</div>
        </Stack>
    );
};

export default MatchInfo;
