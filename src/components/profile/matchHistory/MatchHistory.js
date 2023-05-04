import { useEffect } from "react";
import Match from "./match/Match";
import { getMatchHistoryV1, getMatchDetailsV1 } from "../../../api/LeagueApi";
import { useState } from "react";
import { Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import RecentAllies from "../stats/RecentAllies";
import Performance from "../stats/Performance";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import LinearProgress from "@mui/material/LinearProgress";
import FilterMatch from "./historyFilter/FilterMatch";

const MatchHistory = ({ summonerData, region }) => {
    const [matchHistory, setMatchHistory] = useState([]);
    const [alert, setAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [start, setStart] = useState(0);
    const [matchType, setMatchType] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true);

    const queueChangeHandler = (e) => {
        setMatchType(e.target.value);
        setStart(0);
        setMatchHistory([]);
        setAlert(false);
        setFirstLoad(true);
    };
    useEffect(() => {
        const fetchMatchHistory = async () => {
            setIsLoading(true);
            const matchHistoryResponse = await getMatchHistoryV1(
                summonerData.puuid,
                start,
                region,
                matchType
            );

            if (matchHistoryResponse.data.length < 10) {
                if (matchHistoryResponse.data.length === 0) {
                    setFirstLoad(false);
                }
                setAlert(true);
            }
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
    }, [summonerData.puuid, start, region, matchType]);
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
            width={"100%"}
            justifyContent={"space-between"}
            spacing={1}
        >
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
            {matchHistory.length === 0 && firstLoad ? (
                <Box sx={{ width: "100%" }}>
                    <LinearProgress color="inherit" />
                </Box>
            ) : (
                <Stack spacing={1}>
                    <Box>
                        <FilterMatch
                            matchType={matchType}
                            queueChangeHandler={queueChangeHandler}
                        />
                    </Box>
                    <Stack spacing={1}>
                        {matchHistory.map((match, index) => (
                            <Match
                                match={match}
                                key={index}
                                summonerData={summonerData}
                            />
                        ))}
                    </Stack>

                    {alert ? (
                        <Box
                            width={{
                                xs: "100%",
                                sm: "100%",
                                md: "800px",
                                lg: "800px",
                            }}
                        >
                            <Alert variant="outlined" severity="info">
                                No (more) matches found.
                            </Alert>
                        </Box>
                    ) : (
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
                    )}
                </Stack>
            )}
        </Stack>
    );
};

export default MatchHistory;
