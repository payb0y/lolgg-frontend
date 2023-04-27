import { useEffect } from "react";
import Match from "./Match";
import { getMatchHistoryV1, getMatchDetailsV1 } from "../../api/LeagueApi";
import { useState, useContext } from "react";
import { SummonerContext } from "../../store/SummonerContext";
import Card from "@mui/material/Card";
import { Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

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
            if (matchHistoryResponse.status === 200) {
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
            }
        };

        fetchMatchHistory();
    }, [summonerData.puuid, start]);
    const handleClick = () => {
        setStart(start + 5);
    };
    return (
        <Stack
            minWidth={{ xs: "100%", md: "800px", lg: "800px" }}
            mb={2}
            spacing={2}
        >
            <Card
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {matchHistory &&
                    matchHistory.map((match, index) => (
                        <Match value={match} live={props.value} key={index} />
                    ))}
            </Card>
            <LoadingButton
                loading={isLoading}
                variant="outlined"
                onClick={handleClick}
            >
                More
            </LoadingButton>
        </Stack>
    );
};

export default MatchHistory;
