import RefreshIcon from "@mui/icons-material/Refresh";
import {
    updateSummonerV2,
    updateMatchHistoryV2,
    getMatchHistoryV2,
} from "../../../api/LeagueApi";
import { Typography, Stack, Box, LinearProgress } from "@mui/material";
import { useState } from "react";
import UpdateTimer from "./UpdateTimer";
import { profileActions } from "../../../store";
import { useDispatch } from "react-redux";
import CustomPaper from "../../UI/CustomPaper";

const ProfileUpdate = ({ summonerData }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [timeBeforeNextUpdate, setTimeBeforeNextUpdate] = useState(0);
    const refreshHandler = () => {
        const updateSummonerData = async () => {
            setLoading(true);
            const summonerResponse = await updateSummonerV2(
                summonerData.gameName,
                summonerData.tagLine,
                summonerData.region
            );

            if (summonerResponse.status === 200 && summonerResponse) {
                //if the response is a number, it means that the summoner is not ready to be updated
                if (typeof summonerResponse.data === "number") {
                    setLoading(false);
                    setTimeBeforeNextUpdate(summonerResponse.data);
                    return;
                }
                const reponse = await updateMatchHistoryV2(
                    summonerResponse.data.puuid,
                    summonerResponse.data.region,
                    0,
                    0,
                    10
                );
                if (reponse.length !== 0) {
                    const matchHistoryResponse = await getMatchHistoryV2(
                        summonerData.puuid,
                        summonerData.region,
                        0,
                        0,
                        10
                    );
                    const matchDetailsResponses = [];
                    for (const key in matchHistoryResponse.data) {
                        matchDetailsResponses.push(
                            matchHistoryResponse.data[key]
                        );
                    }
                    dispatch(
                        profileActions.setMatchHistory([
                            ...matchDetailsResponses,
                        ])
                    );
                }

                dispatch(profileActions.setSummonerData(summonerResponse.data));
                //setMatchHistory(matchDetailsResponses);
                //setSummonerData(summonerResponse.data);
                setLoading(false);
            }
        };
        updateSummonerData();
    };
    //if the summoner is not ready to be updated, we display a timer

    //else we display the last update time and a refresh button
    // 2023-05-07T23:50:57.163+00:00 turn this into a date object
    const refreshTime = new Date(summonerData.updatedTime);
    //get how much time since the last update
    const timeSinceLastUpdate = Date.now() - refreshTime;
    //if its less than an hour display the time in minutes
    let time;
    if (timeSinceLastUpdate < 3600000) {
        time = Math.floor(timeSinceLastUpdate / 60000) + " minutes ago";
    } else if (timeSinceLastUpdate < 86400000) {
        time = Math.floor(timeSinceLastUpdate / 3600000) + " hours ago";
    } else {
        time = Math.floor(timeSinceLastUpdate / 86400000) + " days ago";
    }

    return (
        <CustomPaper
            sx={{
                width: "100%",
                height: "25px",
                backgroundColor: "rgba(0,0,0,0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {timeBeforeNextUpdate <= 0 ? (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    width={"100%"}
                    height={"25px"}
                >
                    {!loading ? (
                        <>
                            <RefreshIcon
                                onClick={refreshHandler}
                                onMouseOver={(e) => {
                                    e.target.style.cursor = "pointer";
                                    e.target.style.color = "white";
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.color = "grey";
                                }}
                            />
                            <Typography
                                variant="body1"
                                color="text.primary"
                                fontSize={12}
                            >
                                Updated {time}
                            </Typography>
                        </>
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <LinearProgress
                                sx={{
                                    "& .MuiLinearProgress-barColorPrimary": {
                                        backgroundColor: "#ff8c00",
                                    },
                                }}
                            />
                        </Box>
                    )}
                </Stack>
            ) : (
                <UpdateTimer
                    time={timeBeforeNextUpdate}
                    setTimeBeforeNextUpdate={setTimeBeforeNextUpdate}
                />
            )}
        </CustomPaper>
    );
};
export default ProfileUpdate;
