import { Stack } from "@mui/material";
import SummonerProfile from "../summoner/SummonerProfile";
import SummonerRank from "../summoner/SummonerRank";
import MatchHistory from "../match/MatchHistory";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserV1 } from "../../api/LeagueApi";
import { SummonerContext } from "../../store/SummonerContext";

const Profile = () => {
    const { summonerName } = useParams();
    const [summonerData, setSummonerData] = useState(null);
    useEffect(() => {
        setSummonerData(null);
        const fetchSummonerData = async (summonerName) => {
            const summonerResponse = await getUserV1(summonerName, "EUW");
            if (summonerResponse.status === 200) {
                setSummonerData(summonerResponse.data);
            }
        };
        fetchSummonerData(summonerName);
    }, [summonerName]);
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
                    p={2}
                    direction={{
                        xs: "column",
                        md: "column",
                        lg: "row",
                    }}
                    minWidth="800px"
                >
                    <Stack
                        spacing={2}
                        direction={{
                            xs: "row",
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
