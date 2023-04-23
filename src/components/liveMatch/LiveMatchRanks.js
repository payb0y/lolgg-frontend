import React from "react";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { getSummonerLeagueV1 } from "../../api/LeagueApi";
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1A2027",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white ",
}));
const LiveMatchRanks = ({ participant }) => {
    const [summonerLeague, setSummonerLeague] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getSummonerLeagueV1(participant.summonerId, "EUW").then((res) => {
            setSummonerLeague(res.data);
        });
        setLoading(false);
    }, [participant.summonerId]);

    const soloDuoRank = summonerLeague.find(
        (league) => league.queueType === "RANKED_SOLO_5x5"
    );
    const winRate = (
        (soloDuoRank?.wins / (soloDuoRank?.wins + soloDuoRank?.losses)) *
        100
    ).toFixed(2);
    return (
        <>
            {loading && <CircularProgress />}
            {!loading && soloDuoRank && (
                <Item
                    sx={{
                        fontSize: "0.7rem",
                        padding: "0.1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        width: "150px",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={0.2}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <img
                            src={`https://opgg-static.akamaized.net/images/medals_new/${soloDuoRank.tier}.png?image=q_auto,f_webp,w_144&v=1681446769920`}
                            alt="rank"
                            height={30}
                        />
                        <span>{soloDuoRank.tier} </span>
                        <span>{soloDuoRank.rank}</span>
                        <span>({soloDuoRank.leaguePoints}LP)</span>
                    </Stack>
                    <span>
                        {winRate}% ({soloDuoRank.wins + soloDuoRank.losses}{" "}
                        played)
                    </span>
                </Item>
            )}
        </>
    );
};

export default LiveMatchRanks;
