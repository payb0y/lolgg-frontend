import { Button } from "antd";
import { useEffect } from "react";
import Match from "./Match";
import { getMatchHistoryV1, getMatchDetailsV1 } from "../../api/LeagueApi";
import { useState, useContext } from "react";
import { SummonerContext } from "../../store/SummonerContext";
import Card from "@mui/material/Card";
import { Stack } from "@mui/material";

const MatchHistory = (props) => {
    const [matchHistory, setMatchHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { summonerData } = useContext(SummonerContext);
    const [start, setStart] = useState(0);
    useEffect(() => {
        const fetchMatchHistory = async () => {
            setIsLoading(true);
            const matchHistoryResponse = await getMatchHistoryV1(
                summonerData.puuid,
                start
            );
            const matchIds = await Promise.all(
                matchHistoryResponse.data.map((matchId) => matchId)
            );
            const matchDetailsResponses = await Promise.all(
                matchIds.map((matchId) => getMatchDetailsV1(matchId, "EUW"))
            );
            const matchDetailsData = matchDetailsResponses.map(
                (response) => response.data
            );
            setMatchHistory((pre) => [...pre, ...matchDetailsData]);
            setIsLoading(false);
        };

        fetchMatchHistory();
    }, [summonerData.puuid, start]);
    const handleClick = () => {
        setStart(start + 5);
    };
    return (
        <Stack spacing={1}>
            <Card
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    minWidth: "800px",
                }}
            >
                {matchHistory &&
                    matchHistory.map((match, index) => (
                        <Match value={match} live={props.value} key={index} />
                    ))}
            </Card>
            <Button onClick={handleClick} loading={isLoading}>
                More
            </Button>
        </Stack>
    );
};

export default MatchHistory;
