import React, { useContext } from "react";
import { getSummonerLeagueV1 } from "../../api/LeagueApi";
import { SummonerContext } from "../../store/SummonerContext";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
const SummonerRank = () => {
    const { summonerData } = useContext(SummonerContext);
    const [summonerLeague, setSummonerLeague] = useState([]);
    useEffect(() => {
        getSummonerLeagueV1(summonerData.id, "EUW").then((res) => {
            setSummonerLeague(res.data);
        });
    }, [summonerData.id]);
    return (
        <>
            {summonerLeague &&
                summonerLeague.map((league) => (
                    <Card
                        sx={{
                            width: 200,
                            height: 300,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        key={league.wins}
                    >
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            p={1}
                            spacing={1}
                            key={league.losses}
                        >
                            <span>
                                {league.queueType === "RANKED_FLEX_SR"
                                    ? "FLEX"
                                    : league.queueType === "RANKED_SOLO_5x5"
                                    ? "SOLO QUEUE"
                                    : "TFT"}
                            </span>

                            <img
                                src={`https://opgg-static.akamaized.net/images/medals_new/${league.tier}.png?image=q_auto,f_webp,w_144&v=1681446769920`}
                                alt="rank"
                                height={120}
                            />

                            <span>
                                {league.tier} {league.rank}
                            </span>
                            <span>
                                {league.wins}W {league.losses}L
                            </span>
                            <span>{league.leaguePoints} LP</span>
                            <br />
                        </Stack>
                    </Card>
                ))}
        </>
    );
};
export default SummonerRank;
