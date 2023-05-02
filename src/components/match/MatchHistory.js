import { useEffect } from "react";
import Match from "./Match";
import { getMatchHistoryV1, getMatchDetailsV1 } from "../../api/LeagueApi";
import { useState, useContext } from "react";
import { SummonerContext } from "../../store/SummonerContext";
import Card from "@mui/material/Card";
import { Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import HistoryStats from "./HistoryStats";

const MatchHistory = (props) => {
    const [matchHistory, setMatchHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { summonerData, region } = useContext(SummonerContext);
    const [start, setStart] = useState(0);
    useEffect(() => {
        const fetchMatchHistory = async () => {
            setIsLoading(true);
            const matchHistoryResponse = await getMatchHistoryV1(
                summonerData.puuid,
                start,
                region
            );
            if (matchHistoryResponse.status === 200) {
                const matchIds = await Promise.all(
                    matchHistoryResponse.data.map((matchId) => matchId)
                );
                const matchDetailsResponses = await Promise.all(
                    matchIds.map((matchId) =>
                        getMatchDetailsV1(matchId, region)
                    )
                );
                if (
                    !matchDetailsResponses.find(
                        (response) => response.status !== 200
                    )
                ) {
                    const matchDetailsData = matchDetailsResponses.map(
                        (response) => response.data
                    );
                    setMatchHistory((pre) => [...pre, ...matchDetailsData]);
                    setIsLoading(false);
                }
            }
        };

        fetchMatchHistory();
    }, [summonerData.puuid, start, region]);
    const handleClick = () => {
        setStart(start + 5);
    };
    return (
        <Stack minWidth={{ xs: "100%", md: "800px", lg: "800px" }} spacing={2}>
            {matchHistory.length > 0 && (
                <HistoryStats
                    matchHistory={matchHistory}
                    summonerData={summonerData}
                />
            )}
            <Card
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {matchHistory.length > 0 &&
                    matchHistory.map((match, index) => (
                        <Match value={match} live={props.value} key={index} />
                    ))}
            </Card>
            <LoadingButton
                loading={isLoading}
                variant="outlined"
                onClick={handleClick}
                style={{
                    marginBottom: "20px",
                }}
            >
                More
            </LoadingButton>
        </Stack>
    );
};

export default MatchHistory;
