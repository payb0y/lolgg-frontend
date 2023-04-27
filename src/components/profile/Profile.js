import { Stack } from "@mui/material";
import MatchHistory from "../match/MatchHistory";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserV1 } from "../../api/LeagueApi";
import { SummonerContext } from "../../store/SummonerContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SummonerBanner from "../summoner/SummonerBanner";
import SummonerRank from "../summoner/SummonerRank";
import Alert from "@mui/material/Alert";
const Profile = () => {
    const { summonerName } = useParams();
    const [summonerData, setSummonerData] = useState(null);

    useEffect(() => {
        setSummonerData(null);
        const fetchSummonerData = async (summonerName) => {
            const summonerResponse = await getUserV1(summonerName, "EUW");
            if (summonerResponse.status === 200 && summonerResponse) {
                setSummonerData(summonerResponse.data);
            }
        };
        fetchSummonerData(summonerName);
    }, [summonerName]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <SummonerContext.Provider value={{ summonerData }}>
            {summonerData && (
                <Stack
                    spacing={5}
                    alignItems={"center"}
                    p={isMobile ? 0 : 2}
                    direction={"column"}
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
                </Stack>
            )}
        </SummonerContext.Provider>
    );
};
export default Profile;
