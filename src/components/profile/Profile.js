import { Stack } from "@mui/material";
import SummonerProfile from "../summoner/SummonerProfile";
import SummonerRank from "../summoner/SummonerRank";
import MatchHistory from "../match/MatchHistory";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserV1 } from "../../api/LeagueApi";
import { SummonerContext } from "../../store/SummonerContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
                    justifyContent="center"
                    alignItems={{
                        xs: "center",
                        md: "center",
                        lg: "flex-start",
                    }}
                    p={isMobile ? 0 : 2}
                    direction={{
                        xs: "column",
                        md: "column",
                        lg: "row",
                    }}
                    minWidth={{ xs: "100%", md: "800px", lg: "800px" }}
                >
                    <Stack
                        spacing={2}
                        direction={{
                            xs: "column",
                            md: "row",
                            lg: "column",
                        }}
                        alignContent="center"
                        justifyContent={{
                            xs: "center",
                            md: "center",
                            lg: "flex-start",
                        }}
                    >
                        <SummonerProfile />
                        <SummonerRank />
                    </Stack>
                    <MatchHistory />
                </Stack>
            )}
        </SummonerContext.Provider>
    );
};
export default Profile;
