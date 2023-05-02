import React, { useContext } from "react";
import { SummonerContext } from "../../store/SummonerContext";
import SummonerIcon from "../summoner/SummonerIcon";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getMainChampion } from "../../api/LeagueApi";
import champions from "../../data/champions.json";
import CustomPaper from "../UI/CustomPaper";
import Stack from "@mui/material/Stack";
import LiveMatch from "../liveMatch/LiveMatch";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import SummonerRank from "./SummonerRank";
import SummonerPastRanks from "./SummonerPastRanks";

const SummonerBanner = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { summonerData, region } = useContext(SummonerContext);
    const [mainChampion, setMainChampion] = useState(null);
    const HandleLive = () => {
        setLiveMatchVisible(true);
    };
    const [liveMatchVisible, setLiveMatchVisible] = useState(false);
    useEffect(() => {
        setMainChampion(null);
        const fetchMainChampion = async () => {
            const mainId = await getMainChampion(summonerData.id, region);
            if (mainId.status === 200 && mainId) {
                const champion = champions.keys[mainId.data[0].championId];
                const skin =
                    champions.data[champion].skins[
                        Math.floor(
                            Math.random() *
                                champions.data[champion].skins.length
                        )
                    ];
                setMainChampion({ champion: champion, skin: skin.num });
            }
        };
        fetchMainChampion();
    }, [summonerData, region]);

    return (
        <>
            {liveMatchVisible && (
                <LiveMatch setLiveMatchVisible={setLiveMatchVisible} />
            )}
            {mainChampion && (
                <Box
                    id="main-image"
                    minWidth={{
                        xs: "100%",
                        sm: "100%",
                        md: "100%",
                        lg: "1080px",
                    }}
                    sx={{
                        height: isMobile ? "fit-content" : 430,
                        backgroundImage: isMobile
                            ? `url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${mainChampion.champion}_${mainChampion.skin}.jpg)`
                            : `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${mainChampion.champion}_${mainChampion.skin}.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "start",
                        padding: "10px",
                    }}
                >
                    <Stack
                        alignItems={{
                            xs: "center",
                            sm: "flex-start",
                            md: "flex-start",
                            lg: "flex-start",
                        }}
                        height="100%"
                        justifyContent={"center"}
                        spacing={1}
                    >
                        <SummonerPastRanks />
                        <CustomPaper
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0,0,0,0.5)",
                            }}
                        >
                            <SummonerIcon
                                summoner={summonerData}
                                width={150}
                                height={150}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "white",
                                }}
                            >
                                {summonerData.name}
                            </Typography>
                            <Button variant="outlined" onClick={HandleLive}>
                                Live Match
                            </Button>
                        </CustomPaper>
                        <SummonerRank />
                    </Stack>
                </Box>
            )}
        </>
    );
};

export default SummonerBanner;
