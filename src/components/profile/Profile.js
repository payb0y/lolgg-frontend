import { Stack, Box, LinearProgress } from "@mui/material";
import MatchHistory from "./matchHistory/MatchHistory";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SummonerBanner from "./profileBanner/SummonerBanner";
import SummonerNotFound from "../errorPages/SummonerNotFound";
import { getSummonerV2 } from "../../api/LeagueApi";

const Profile = () => {
    const { summonerName, region } = useParams();
    const [summonerData, setSummonerData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    useEffect(() => {
        setSummonerData(null);
        setNotFound(false);
        const fetchSummonerData = async () => {
            const summonerResponseV1 = await getSummonerV2(
                summonerName,
                region
            );
            if (summonerResponseV1.status === 200 && summonerResponseV1) {
                setSummonerData(summonerResponseV1.data);
            } else {
                setNotFound(true);
            }
        };
        fetchSummonerData();
    }, [summonerName, region]);
    return (
        <>
            {notFound ? (
                <SummonerNotFound name={summonerName} />
            ) : (
                <>
                    {summonerData ? (
                        <Box
                            sx={{
                                margin: "auto",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "20px",
                            }}
                            width={{
                                xs: "100%",
                                sm: "800px",
                                md: "100%",
                                lg: "1150px",
                            }}
                        >
                            <SummonerBanner
                                summonerData={summonerData}
                                region={region}
                                setSummonerData={setSummonerData}
                            />
                            <Stack
                                spacing={3}
                                direction={{
                                    xs: "column",
                                    sm: "column",
                                    md: "column",
                                    lg: "row",
                                }}
                                justifyContent={{
                                    xs: "center",
                                    sm: "center",
                                    md: "center",
                                    lg: "flex-start",
                                }}
                                alignItems={{
                                    xs: "center",
                                    sm: "center",
                                    md: "center",
                                    lg: "flex-start",
                                }}
                                width={"100%"}
                            >
                                <MatchHistory
                                    summonerData={summonerData}
                                    region={region}
                                />
                            </Stack>
                        </Box>
                    ) : (
                        <Box sx={{ width: "100%" }}>
                            <LinearProgress color="inherit" />
                        </Box>
                    )}
                </>
            )}
        </>
    );
};
export default Profile;
