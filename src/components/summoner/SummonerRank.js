import { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { getSummonerLeagueV1 } from "../../api/LeagueApi";
import { SummonerContext } from "../../store/SummonerContext";
import Rank from "../parts/Rank";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomPaper from "../UI/CustomPaper";
const SummonerRank = () => {
    const { summonerData } = useContext(SummonerContext);
    const [summonerLeague, setSummonerLeague] = useState([]);
    useEffect(() => {
        getSummonerLeagueV1(summonerData.id, "EUW").then((res) => {
            setSummonerLeague(res.data);
        });
    }, [summonerData.id]);
    return (
        <Stack
            spacing={4}
            direction={{
                xs: "column",
                sm: "row",
                md: "row",
                lg: "column",
            }}
        >
            {summonerLeague &&
                summonerLeague.map((league) => (
                    <Stack key={league.losses} width={220}>
                        <CustomPaper>
                            <Typography component="div">
                                <Box
                                    sx={{
                                        fontWeight: "medium",
                                    }}
                                >
                                    {league.queueType === "RANKED_FLEX_SR"
                                        ? "FLEX"
                                        : league.queueType === "RANKED_SOLO_5x5"
                                        ? "SOLO/DUO"
                                        : "TFT"}
                                </Box>
                                <Box>
                                    {league.tier} {league.rank} (
                                    {league.leaguePoints} LP)
                                </Box>
                                <Box>
                                    {league.wins}W/{league.losses}L
                                </Box>
                            </Typography>
                            <Rank name={league.tier} height={120} />
                        </CustomPaper>
                    </Stack>
                ))}
        </Stack>
    );
};
export default SummonerRank;
