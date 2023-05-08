import { Stack } from "@mui/material";
import Rank from "../../parts/Rank";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomPaper from "../../UI/CustomPaper";

const SummonerRank = ({ summonerData }) => {
    const summonerLeague = summonerData.ranks;
    return (
        <Stack
            spacing={0.5}
            direction={{
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
            }}
        >
            {summonerLeague &&
                summonerLeague.map((league) => {
                    const wr = Math.round(
                        (league.wins / (league.wins + league.losses)) * 100
                    );
                    return (
                        <Stack key={league.losses}>
                            <CustomPaper
                                sx={{
                                    backgroundColor: "rgba(0,0,0,0.8)",
                                    color: "white",
                                }}
                            >
                                <Typography
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                    >
                                        <Rank name={league.tier} height={100} />
                                        <Stack
                                            justifyContent="center"
                                            alignItems="center"
                                            width="100%"
                                        >
                                            <Box
                                                sx={{
                                                    fontWeight: "medium",
                                                }}
                                            >
                                                {league.queueType ===
                                                "RANKED_FLEX_SR"
                                                    ? "FLEX"
                                                    : league.queueType ===
                                                      "RANKED_SOLO_5x5"
                                                    ? "SOLO/DUO"
                                                    : "TFT"}
                                            </Box>
                                            <Box>
                                                {league.tier} {league.rank}
                                            </Box>
                                            <Box>
                                                {league.wins}W/{league.losses}L
                                                ({league.leaguePoints} LP)
                                            </Box>
                                            <Box>{wr}% WR</Box>
                                        </Stack>
                                    </Stack>
                                </Typography>
                            </CustomPaper>
                        </Stack>
                    );
                })}
        </Stack>
    );
};
export default SummonerRank;
