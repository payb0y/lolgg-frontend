import { useContext, useEffect, useState } from "react";
import { Stack, Card } from "@mui/material";
import { getSummonerLeagueV1 } from "../../api/LeagueApi";
import { SummonerContext } from "../../store/SummonerContext";
import Rank from "../parts/Rank";
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
                            <Rank name={league.tier} height={120} />
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
