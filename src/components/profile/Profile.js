import { Stack, Box, LinearProgress } from "@mui/material";
import MatchHistory from "./matchHistory/MatchHistory";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SummonerBanner from "./profileBanner/SummonerBanner";
import SummonerNotFound from "../errorPages/SummonerNotFound";
import { getSummonerV2 } from "../../api/LeagueApi";
import { profileActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
const Profile = () => {
    const { summonerName, region } = useParams();
    const [notFound, setNotFound] = useState(false);
    const profile = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    useEffect(() => {
        setNotFound(false);
        dispatch(profileActions.emptySummonerData());
        const fetchSummonerData = async () => {
            const summonerResponseV1 = await getSummonerV2(
                summonerName,
                region
            );
            if (summonerResponseV1.status === 200 && summonerResponseV1) {
                dispatch(
                    profileActions.setSummonerData(summonerResponseV1.data)
                );
                dispatch(profileActions.setRegion(region));
            } else {
                setNotFound(true);
            }
        };
        fetchSummonerData();
    }, [summonerName, region, dispatch]);
    return (
        <>
            {notFound ? (
                <SummonerNotFound name={summonerName} />
            ) : (
                <>
                    {profile.summonerData ? (
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
                                summonerData={profile.summonerData}
                                region={profile.region}
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
                                    summonerData={profile.summonerData}
                                    region={profile.region}
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
