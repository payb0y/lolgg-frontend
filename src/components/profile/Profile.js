import { Stack } from "@mui/material";
import MatchHistory from "../match/MatchHistory";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserV1 } from "../../api/LeagueApi";
import { SummonerContext } from "../../store/SummonerContext";
import SummonerBanner from "../summoner/SummonerBanner";
import SummonerRank from "../summoner/SummonerRank";
import Box from "@mui/material/Box";
const Profile = () => {
    const { summonerName, region } = useParams();
    const [summonerData, setSummonerData] = useState(null);

    useEffect(() => {
        setSummonerData(null);
        const fetchSummonerData = async () => {
            const summonerResponse = await getUserV1(summonerName, region);
            if (summonerResponse.status === 200 && summonerResponse) {
                setSummonerData(summonerResponse.data);
            }
        };
        fetchSummonerData();
    }, [summonerName, region]);
    return (
        <SummonerContext.Provider value={{ summonerData, region }}>
            {summonerData && (
                <Box
                    sx={{
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                    }}
                    minWidth={{
                        xs: "100%",
                        sm: "800px",
                        md: "800px",
                        lg: "1200px",
                    }}
                >
                    <SummonerBanner />
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
                    >
                        <SummonerRank />
                        <MatchHistory />
                    </Stack>
                </Box>
            )}
        </SummonerContext.Provider>
    );
};
export default Profile;
