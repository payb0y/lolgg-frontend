import { useEffect } from "react";
import Match from "../match/Match";
import { getMatchHistoryV1, getMatchDetailsV1 } from "../../api/LeagueApi";
import { useState, useContext } from "react";
import { SummonerContext } from "../../store/SummonerContext";
import Card from "@mui/material/Card";
import { Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
// import HistoryStats from "../matchHistory/HistoryStats";
import RecentAllies from "./RecentAllies";
import Performance from "./Performance";

const MatchHistory = () => {
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
            const matchIds = await Promise.all(
                matchHistoryResponse.data.map((matchId) => matchId)
            );
            const matchDetailsResponses = await Promise.all(
                matchIds.map((matchId) =>
                    getMatchDetailsV1(matchId, region).then(
                        (response) => response.data
                    )
                )
            );
            setMatchHistory((pre) => [...pre, ...matchDetailsResponses]);
            setIsLoading(false);
        };

        fetchMatchHistory();
    }, [summonerData.puuid, start, region]);
    const handleClick = () => {
        setStart(start + 10);
    };
    return (
        <Stack
            direction={{ xs: "column", md: "column", lg: "row" }}
            alignItems={{
                xs: "center",
                md: "center",
                lg: "flex-start",
            }}
            spacing={1}
        >
            {matchHistory.length > 0 && (
                <Stack
                    spacing={1}
                    direction={{
                        xs: "column",
                        sm: "row",
                        md: "row",
                        lg: "column",
                    }}
                >
                    <RecentAllies
                        matchHistory={matchHistory}
                        summonerData={summonerData}
                    />
                    <Performance
                        matchHistory={matchHistory}
                        summonerData={summonerData}
                    />
                </Stack>
            )}
            <Stack
                minWidth={{ xs: "100%", md: "800px", lg: "800px" }}
                spacing={1}
            >
                {/* {matchHistory.length > 0 && (
                    <HistoryStats
                        matchHistory={matchHistory}
                        summonerData={summonerData}
                    />
                )} */}
                <Card
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    {matchHistory.length > 0 &&
                        matchHistory.map((match, index) => (
                            <Match match={match} key={index} />
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
        </Stack>
    );
};

export default MatchHistory;
